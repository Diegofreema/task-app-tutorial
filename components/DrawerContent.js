import { Linking } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { POLICY, TERMS } from '../screens/SignUp';
import { supabase } from '../lib/supabase';
import Toast from 'react-native-toast-message';

const DrawerContent = (props) => {
  const handleLinks = (url) => {
    Linking.openURL(url);
  };
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    return Toast.show({
      type: 'success',
      text1: 'You have been signed out',
      text2: 'Hope to see you again',
    });
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('home')}
      />
      <DrawerItem
        label="Task"
        onPress={() => props.navigation.navigate('task')}
      />
      <DrawerItem label="Privacy Policy" onPress={() => handleLinks(POLICY)} />
      <DrawerItem
        label="Terms & Conditions"
        onPress={() => handleLinks(TERMS)}
      />
      <DrawerItem label="Log out" onPress={logOut} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
