import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import MainScreenHeader from '../components/MainScreenHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchBar from '../components/SearchBar';
import ExploreSoundList from '../components/ExploreSoundsList';
import FavoriteSoundList from '../components/FavoriteSoundsList';
import { AdMobBanner } from 'expo-ads-admob';
import config from '../config';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled(LinearGradient).attrs({
  colors: ['#FFE17E', '#F37578']
})`
  padding-horizontal: 10px;
  flex: 1;
`;

const Tab = createMaterialTopTabNavigator();

const TabContainer = styled.View`
  margin-top: 15px;
  flex: 1;
`;

const AdContainer = styled.View`
  align-items: center;
  border-top-color: #FFFFFF;
  border-top-width: 1px;
  border-radius: 10px;
  display: ${props => props.show ? 'flex' : 'none' }
`;

const Tabs = styled(Tab.Navigator).attrs({
  tabBarOptions: {
    labelStyle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    indicatorStyle: {
      backgroundColor: '#FF7F00',
    },
    style: {
      backgroundColor: 'transparent',
    },
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
    borderTopColor: '#FFFFFF',
    borderTopWidth: 2,
    marginTop: -2,
  },
})``;

const Home = () => {
  const [showAdContainer, setShowAdContainer] = React.useState(false);

  return (
    <Container>
      <SafeArea>
        <MainScreenHeader />
        <SearchBar />
        <TabContainer>
          <Tabs>
            <Tab.Screen name="favoritos" component={FavoriteSoundList} />
            <Tab.Screen name="explorar" component={ExploreSoundList} />
          </Tabs>
        </TabContainer>
        <AdContainer show={showAdContainer}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID={config.ADD_UNIT_ID}
            servePersonalizedAds
            onAdViewDidReceiveAd={() => setShowAdContainer(true)}
          />
        </AdContainer>
      </SafeArea>
    </Container>
  )
}

export default Home;