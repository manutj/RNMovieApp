import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MovieScreen from '../screens/MovieScreen';
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
      case 'movie':
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
        component={HomeScreen}
        options={{
          title: 'My movie app',
          headerRight: () => buttonRight(),
          headerLeft: () => buttonLeft('home'),
        }}
      />

      <Stack.Screen
        name="movie"
        component={MovieScreen}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('movie'),
          headerRight: () => buttonRight(),
        }}
      />

      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{
          title: '',
          headerLeft: () => buttonLeft('search'),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
