import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from './SignInScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation, setDataInput}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SignInScreen" options={{headerShown: false}}>
      {props => <SignInScreen {...props} setDataInput={setDataInput} />}
    </RootStack.Screen>
  </RootStack.Navigator>
);

export default RootStackScreen;
