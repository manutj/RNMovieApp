import 'react-native-gesture-handler';
import React, {useMemo, useState, useEffect} from 'react';
import {StatusBar, ActivityIndicator, View, LogBox} from 'react-native';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './src/navigation/Navigation';
import Preferences from './src/context/Preferences';
import RootStackScreen from './src/screens/RootStackScreen';
import {AuthContext} from './src/context/Login';

LogBox.ignoreAllLogs(true);

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [dataInput, setDataInput] = useState({email: '', password: ''});
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useMemo(() => ({
    signIn: async () => {
      const {email, password} = dataInput;
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (email === 'eve.holt@reqres.in' && password === 'cityslicka') {
        try {
          setUserToken(data.token);
          await AsyncStorage.setItem('userToken', data.token);
        } catch (error) {
          console.log(error);
        }
      }
    },
    signOut: async () => {
      setUserToken(null);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (error) {
        console.log(error);
      }
    },
  }));

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error);
      }
    }, 1000);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  DefaultThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.primary = '#1ae1f2';
  DarkThemePaper.colors.accent = '#1ae1f2';
  DarkThemeNavigation.colors.background = '#192734';
  DarkThemeNavigation.colors.card = '#15212b';

  const preference = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme],
  );
  return (
    <Preferences.Provider value={preference}>
      <PaperProvider
        theme={theme === 'dark' ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <AuthContext.Provider value={authContext}>
          <NavigationContainer
            theme={
              theme === 'dark' ? DarkThemeNavigation : DefaultThemeNavigation
            }>
            {userToken !== null ? (
              <Navigation />
            ) : (
              <RootStackScreen setDataInput={setDataInput} />
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </Preferences.Provider>
  );
};

export default App;
