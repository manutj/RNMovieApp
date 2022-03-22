import React, {useState} from 'react';
import {Drawer, Text, Switch, TouchableRipple} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import usePreferences from '../hooks/usePreferences';

const DrawerNavigation = ({navigation}) => {
  const {theme, toggleTheme} = usePreferences();
  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={true}
          onPress={() => navigation.navigate('popular')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.switch}>
            <Text>Dark mode</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
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
