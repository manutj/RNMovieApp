import React, {useContext} from 'react';
import {Drawer, Text, Switch, TouchableRipple} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import usePreferences from '../hooks/usePreferences';
import {AuthContext} from '../context/Login';

const DrawerNavigation = ({navigation}) => {
  const {theme, toggleTheme} = usePreferences();
  const {signOut} = useContext(AuthContext);
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={true}
          onPress={() => navigation.navigate('popular')}
        />
      </Drawer.Section>
      <Drawer.Section title="Preferencias">
        <TouchableRipple>
          <View style={styles.switch}>
            <Text>Dark mode</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <Drawer.Section>
        <Drawer.Item
          label="Sign Out"
          icon={() => <Icon name={'exit-to-app'} color={'grey'} size={20} />}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default DrawerNavigation;
