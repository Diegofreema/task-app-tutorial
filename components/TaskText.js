import { StyleSheet } from 'react-native';
import React from 'react';
import { HStack, Icon, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TaskText = ({ completed, task, handleCompleted }) => {
  return (
    <HStack alignItems={'center'} space={3}>
      <Icon
        onPress={handleCompleted}
        as={MaterialCommunityIcons}
        name={completed ? 'checkbox-intermediate' : 'checkbox-blank-outline'}
        size={25}
      />
      <Text
        fontWeight={'semibold'}
        fontSize={'md'}
        style={{ textDecorationLine: completed ? 'line-through' : 'none' }}
      >
        {task}
      </Text>
    </HStack>
  );
};

export default TaskText;

const styles = StyleSheet.create({});
