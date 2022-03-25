import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigation from './StackNavigation';
import DrawerNavigation from './DrawerNavigation';

const Navigation = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="app"
      drawerContent={props => <DrawerNavigation {...props} />}>
      <Drawer.Screen
        name="app"
        component={StackNavigation}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default Navigation;
