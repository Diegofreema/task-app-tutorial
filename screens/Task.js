import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Spinner, View, Text } from 'native-base';
import FloatingButton from '../components/FloatinButton';
import Category from '../components/Category';
import TitleComponent from '../components/TitleComponent';
import { colors } from '../constants/color';
import { useQuery } from 'react-query';
import { supabase } from '../lib/supabase';
import TaskText from '../components/TaskText';

const Task = () => {
  const [selected, setSelected] = useState('Very Important');
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getInitialData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('category', selected.toLowerCase());
    if (!error) {
      setTasks(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getInitialData();
  }, [supabase, selected]);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user.id);
    };

    getUser();
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
          filter: `category=eq.${selected}`,
        },
        ({ new: newTask }) => {
          const index = tasks.findIndex((task) => task.id === newTask.id);
          if (index !== -1) {
            const updatedItems = tasks.slice();
            updatedItems[index].completed = newTask.completed;
            setTasks(updatedItems);
          } else {
            setTasks((prev) => [...prev, newTask]);
          }
        }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [supabase, selected]);

  const handleCompleted = async (id) => {
    setCompleted((prev) => !prev);
    console.log(id, completed);
    const { error } = await supabase
      .from('tasks')
      .update({ completed })
      .eq('id', id)
      .select();

    if (error) {
      console.log(error);
    }
  };

  return (
    <Box flex={1} safeArea={5}>
      <TitleComponent
        title={'To Do Task'}
        color={colors.semiHeading}
        fontWeight={'normal'}
        size={'xl'}
      />
      <View my={10}>
        <Category setSelected={setSelected} selected={selected} />
      </View>
      <FlatList
        refreshing={loading}
        onRefresh={getInitialData}
        data={tasks}
        ListEmptyComponent={
          <View>
            <Text textAlign={'center'} fontSize={'xl'} fontWeight={'bold'}>
              No category found
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TaskText
            completed={item.completed}
            task={item.description}
            handleCompleted={() => handleCompleted(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <FloatingButton />
    </Box>
  );
};

export default Task;

const styles = StyleSheet.create({});
