import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import SoundDetail from './screens/SoundDetail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode="none">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="soundDetail" component={SoundDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}