import { StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, HStack, Spinner, Text, View } from 'native-base';
import moment from 'moment';

import { supabase } from '../lib/supabase';

import TitleComponent from '../components/TitleComponent';
import { colors } from '../constants/color';
import FloatingButton from '../components/FloatinButton';

const Home = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(tasks);

  const highPriority = tasks?.filter(
    (task) => task.category === 'very important'
  );
  const lowPriority = tasks?.filter((task) => task.category === 'nice to do');

  const dueDeadline = tasks?.filter((task) => {
    const formattedDeadline = moment(task.deadline).format('DD-MM-YYYY');
    const now = moment(new Date()).format('DD-MM-YYYY');
    moment(formattedDeadline).isSameOrAfter(now);
  });

  const feedback = [
    {
      id: 1,
      title: 'High Priority',
      count: highPriority.length,
    },
    {
      id: 2,
      title: 'Due Deadline',
      count: dueDeadline.length,
    },
    {
      id: 3,
      title: 'Low Priority',
      count: lowPriority.length,
    },
  ];

  // function to switch between screen
  const handleNavigation = () => {
    navigation.navigate('task');
  };
  const getInitialData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('tasks').select('*');

    if (!error) {
      setTasks(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getInitialData();
  }, []);
  useEffect(() => {
    const channel = supabase
      .channel('changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        ({ new: newTask }) => {
          setTasks((prev) => [...prev, newTask]);
        }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [supabase]);

  useEffect(() => {
    // function to get the logged in user
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
    };
    getCurrentUser();
  }, []);
  const box = new Array(3).fill('');
  if (loading) {
    return <Spinner />;
  }
  return (
    <Box safeArea={5} flex={1}>
      <TitleComponent
        color={colors.semiHeading}
        fontWeight={'normal'}
        title={'Daily Tasks:'}
      />
      <HStack space={3} pr={4} mt={4}>
        {feedback.map((item, index) => (
          <View
            w={'1/3'}
            backgroundColor={index % 2 === 0 ? ' #EEEFF0' : '#FFF4F4'}
            h={100}
            rounded={8}
            key={item.id}
            pl={3}
            pt={4}
          >
            <Text color={index % 2 === 0 ? 'blue.800' : 'red.800'}>
              {item.title}
            </Text>
            <Text
              color={index % 2 === 0 ? 'blue.800' : 'red.800'}
              fontSize={'3xl'}
            >
              {item.count}
            </Text>
          </View>
        ))}
      </HStack>

      <Pressable
        onPress={handleNavigation}
        style={{
          alignItems: 'center',
          marginTop: 80,
          backgroundColor: '#EEEFF0',
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text alignSelf={'flex-start'} fontSize={16} color={'blue.500'} mb={2}>
          Check all my tasks
        </Text>
        <Text>
          See all tasks and filter them by categories you have selected when
          creating them
        </Text>
      </Pressable>
      <FloatingButton />
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
