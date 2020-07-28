import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApolloProvider } from '@apollo/react-hooks';
import DrawerContent from './components/DrawerContent';
import client from './apollo';
import Home from './screens/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={DrawerContent}
          drawerStyle={{
            width: '85%',
            backgroundColor: '#F37578',
            borderRadius: 15,
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}