import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ApolloProvider } from "@apollo/react-hooks";
import DrawerContent from "../components/DrawerContent";
import client from "../apollo";
import Home from "../app/index";
import CreateSoundPage from "../app/CreateSoundPage";
import store from "../store";

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Drawer.Navigator
          drawerContent={DrawerContent}
          drawerStyle={{
            width: "85%",
            backgroundColor: "#F37578",
            borderRadius: 15,
          }}
        >
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="CreateSoundPage"
            component={CreateSoundPage}
            options={{ headerShown: false }}
          />
        </Drawer.Navigator>
      </ApolloProvider>
    </Provider>
  );
}
