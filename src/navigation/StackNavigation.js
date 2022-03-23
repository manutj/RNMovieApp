import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import {IconButton} from 'react-native-paper';
const StackNavigation = ({navigation}) => {
  const Stack = createNativeStackNavigator();

  const buttonRight = () => {
    return (
      <IconButton
        icon={'magnify'}
        onPress={() => navigation.navigate('search')}
      />
    );
  };
  const buttonLeft = screen => {
    switch (screen) {
      case 'search':
        return (
          <IconButton icon={'arrow-left'} onPress={() => navigation.goBack()} />
        );
        break;

      default:
        return (
          <IconButton icon={'menu'} onPress={() => navigation.openDrawer()} />
        );
        break;
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'My movie app',
          headerRight: () => buttonRight(),
          headerLeft: () => buttonLeft('home'),
        }}
      />

      <Stack.Screen
        name="search"
        component={Search}
        options={{title: '', headerLeft: () => buttonLeft('search')}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
