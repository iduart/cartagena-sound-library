import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import SoundDetail from './screens/SoundDetail';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="soundDetail" component={SoundDetail} />
      </Drawer.Navigator>
      {/* <Stack.Navigator initialRouteName="home" headerMode="none">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="soundDetail" component={SoundDetail} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}