import { StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button, HStack, Icon, ScrollView, Text, View } from 'native-base';
import { EvilIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation } from 'react-query';
import Toast from 'react-native-toast-message';
import moment from 'moment';

import TitleComponent from '../components/TitleComponent';
import { colors } from '../constants/color';
import InputComponent from '../components/InputComponent';
import { supabase } from '../lib/supabase';
import Category from '../components/Category';

const AddTask = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState('Very Important');
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);

  const [deadline, setDeadline] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false);
    setDeadline(currentDate);
  };
  const showDatePicker = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setId(user.id);
      setEmail(user.email);
    };

    getUser();
  }, []);
  const handleTask = async () => {
    setLoading(true);
    if (description === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter a description',
      });
      return setLoading(false);
    }
    const deadlineFormatted = moment(deadline).format('DD-MM-YYYY');
    const today = moment(new Date()).format('DD-MM-YYYY');
    if (moment(deadlineFormatted).isBefore(today)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter a future date!!',
      });
      return setLoading(false);
    }
    const { error } = await supabase.from('tasks').insert({
      description,
      deadline,
      category: selected.toLowerCase(),
      email,
    });
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'An error has occurred',
        text2: error.message,
      });
      setLoading(false);
      console.log(error);
      return;
    }
    if (!error) {
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Your task has been added',
      });
      navigation.navigate('task');
      setLoading(false);
    }
    setDescription('');
    setDeadline(new Date());
    setSelected('Very Important');
  };

  return (
    <Box safeArea={5}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View mt={20}>
          <TitleComponent
            title={'Add New Task'}
            color={colors.semiHeading}
            fontWeight={'normal'}
            size={'xl'}
          />
          <Text my={5}>Describe your task</Text>
          <View style={styles.inputContainer}>
            <InputComponent
              placeholder={'Type here'}
              value={description}
              setValue={setDescription}
              style={styles.inputStyle}
            />
          </View>
          <Text>Type</Text>
          <Category setSelected={setSelected} selected={selected} />
          <View mt={4}>
            <Text mb={3}>Deadline</Text>
            <Pressable onPress={showDatePicker} style={styles.deadline}>
              <HStack alignItems={'center'}>
                <Icon as={EvilIcons} name="calendar" size={30} />
                <Text>{moment(deadline).format('L')}</Text>
              </HStack>
            </Pressable>
            {open && (
              <DateTimePicker
                testID="dateTimePicker"
                value={deadline}
                mode={'date'}
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
          <Button
            isLoading={loading}
            onPress={handleTask}
            mt={10}
            h={50}
            backgroundColor={'#5551FF'}
          >
            <Text fontSize={'xl'} color="white">
              Add Task
            </Text>
          </Button>
        </View>
      </ScrollView>
    </Box>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    padding: 5,
    marginBottom: 15,
  },
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
  deadline: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 8,
  },
});
