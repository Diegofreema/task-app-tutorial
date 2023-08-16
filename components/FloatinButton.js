import { StyleSheet } from 'react-native';
import React from 'react';
import { Icon, Pressable } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FloatingButton = () => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate('addTask');
  };
  return (
    <Pressable
      onPress={handleNavigation}
      backgroundColor={'#4681A3'}
      w={50}
      h={50}
      alignItems={'center'}
      justifyContent={'center'}
      rounded={'full'}
      position={'absolute'}
      bottom={20}
      right={4}
    >
      <Icon as={Entypo} name="plus" size={30} color={'white'} />
    </Pressable>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({});
