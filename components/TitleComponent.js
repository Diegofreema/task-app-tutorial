import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Heading, Input } from 'native-base';
import { colors } from '../constants/color';
const TitleComponent = ({
  title,
  size,
  color = colors.headingColor,
  fontWeight,
}) => {
  return (
    <Heading color={color} fontWeight={fontWeight && fontWeight} size={size}>
      {title}
    </Heading>
  );
};

export default TitleComponent;

const styles = StyleSheet.create({});
