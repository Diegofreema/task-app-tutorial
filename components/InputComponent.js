import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Input } from 'native-base';
import { colors } from '../constants/color';

const InputComponent = ({
  placeholder,
  value,
  setValue,
  type = 'default',
  secureTextEntry = false,
  style,
}) => {
  return (
    <Input
      value={value}
      onChangeText={setValue}
      _input={[styles.input, styles]}
      variant={'unstyled'}
      placeholder={placeholder}
      placeholderTextColor={'black'}
      keyboardType={type}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    backgroundColor: colors.inputColor,
    borderColor: 'transparent',
    paddingHorizontal: 10,
    fontSize: 15,
    height: 50,
  },
});
