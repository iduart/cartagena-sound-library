// Forwards a port on this Mac to the API running on EC2, so the app can talk to
// the deployed API without any config change.
//
//   node scripts/proxy-to-ec2.js
//   node scripts/proxy-to-ec2.js --target 18.190.59.58:8000 --port 8000
//
// Why this exists: iOS App Transport Security refuses cleartext HTTP to public
// addresses, and this project's Info.plist sets NSAllowsArbitraryLoads=false
// with NSAllowsLocalNetworking=true. Private LAN addresses are therefore
// allowed but 18.190.59.58 is not. Binding this proxy to 0.0.0.0 means the app
// reaches it at the Mac's LAN address (192.168.x.x), which ATS permits, and
// config.ts already derives exactly that host from the Expo dev server.
//
// It also means physical devices on the same WiFi work, not just the simulator.
const http = require("http");
const net = require("net");

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const [targetHost, targetPortRaw] = arg("target", "18.190.59.58:8000").split(":");
const targetPort = Number(targetPortRaw || 8000);
const listenPort = Number(arg("port", 8000));

const server = http.createServer((req, res) => {
  const proxyReq = http.request(
    {
      host: targetHost,
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: `${targetHost}:${targetPort}` },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on("error", (err) => {
    console.error(`  ! ${req.method} ${req.url} -> ${err.message}`);
    if (!res.headersSent) res.writeHead(502, { "Content-Type": "text/plain" });
    res.end(`proxy error: ${err.message}`);
  });

  req.pipe(proxyReq);
});

// GraphQL subscriptions / websockets, in case they are ever added.
server.on("upgrade", (req, socket, head) => {
  const upstream = net.connect(targetPort, targetHost, () => {
    upstream.write(
      `${req.method} ${req.url} HTTP/1.1\r\n` +
        Object.entries(req.headers)
          .map(([k, v]) => `${k}: ${v}\r\n`)
          .join("") +
        "\r\n"
    );
    if (head && head.length) upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });
  upstream.on("error", () => socket.destroy());
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${listenPort} is already in use.\n` +
        "If the EC2 simulation container is running, stop it first:\n" +
        "  docker compose -f ../cartagena-sound-library-api/ec2-sim/docker-compose.yml stop\n" +
        `Or pick another port:  node scripts/proxy-to-ec2.js --port 8100\n` +
        "  (then start Expo with EXPO_PUBLIC_API_URL=http://<your-lan-ip>:8100/)"
    );
    process.exit(1);
  }
  throw err;
});

server.listen(listenPort, "0.0.0.0", () => {
  console.log(`proxying 0.0.0.0:${listenPort} -> ${targetHost}:${targetPort}`);
  console.log("the app's existing dev config will find this automatically");
  console.log("Ctrl-C to stop");
});
