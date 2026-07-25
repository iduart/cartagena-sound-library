import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import MainScreenHeader from "../components/MainScreenHeader";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchBar from "../components/SearchBar";
import ExploreSoundList from "../components/ExploreSoundsList";
import FavoriteSoundList from "../components/FavoriteSoundsList";
// import { AdMobBanner } from 'expo-ads-admob';
// import config from '../config';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled(LinearGradient).attrs({
  colors: ["#FFE17E", "#F37578"],
})`
  padding-horizontal: 10px;
  flex: 1;
`;

const Tab = createMaterialTopTabNavigator();

const TabContainer = styled.View`
  margin-top: 15px;
  flex: 1;
`;

const tabNavigatorOptions = {
  sceneStyle: {
    backgroundColor: "transparent",
    borderTopColor: "#FFFFFF",
    borderTopWidth: 2,
    marginTop: -2,
  },
};

const tabScreenOptions = {
  tabBarLabelStyle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#FF7F00",
  },
  tabBarStyle: {
    backgroundColor: "transparent",
  },
};

export default function Index() {
  return (
    <Container>
      <SafeArea>
        <MainScreenHeader />
        <SearchBar />
        <TabContainer>
          <Tab.Navigator
            screenOptions={tabNavigatorOptions}
            style={{ backgroundColor: "transparent" }}
          >
            <Tab.Screen
              name="Favoritos"
              component={FavoriteSoundList}
              options={tabScreenOptions}
            />
            <Tab.Screen
              name="Explorar"
              component={ExploreSoundList}
              options={tabScreenOptions}
            />
          </Tab.Navigator>
        </TabContainer>
      </SafeArea>
    </Container>
  );
}
