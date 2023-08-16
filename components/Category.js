import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { ScrollView } from 'native-base';
const categories = [
  'Very Important',
  'Important',
  'Not so important',
  'Quick task',
  'Nice to do',
];
const Category = ({ selected, setSelected }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 10, marginTop: 5 }}
    >
      {categories.map((cat, i) => (
        <Pressable
          onPress={() => setSelected(cat)}
          key={i}
          style={({ pressed }) => [
            pressed && styles.pressed,
            selected === cat ? styles.selectedStyle : styles.cat,
          ]}
        >
          <Text style={{ color: '#4681A3' }}>{cat}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Category;

const styles = StyleSheet.create({
  cat: {
    borderWidth: 1,
    borderColor: '#4681A3',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
  },
  pressed: {
    opacity: 0.5,
  },
  selectedStyle: {
    backgroundColor: '#EEEFF0',
    borderColor: '#EEEFF0',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});
