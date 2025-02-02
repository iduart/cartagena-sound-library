import { Stack } from "expo-router";
import { Provider } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { ApolloProvider } from "@apollo/react-hooks";
// import DrawerContent from "./components/DrawerContent";
import client from "../apollo";
// import Home from "./screens/Home";
// import CreateSoundPage from "./screens/CreateSoundPage";
import store from "../store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {/* <NavigationContainer> */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
        {/* </NavigationContainer> */}
      </ApolloProvider>
    </Provider>
  );
}
