import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';
import { supabase } from './lib/supabase';
import Home from './screens/Home';
import Task from './screens/Task';
import AddTask from './screens/AddTask';
import { Icon } from 'native-base';
import DrawerContent from './components/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20, color: 'black' },
          headerShown: true,
          title: 'Home',
          headerShadowVisible: false,
        }}
      />
      <Drawer.Screen
        name="task"
        component={Task}
        options={{
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20, color: 'black' },
          headerShown: true,
          title: 'Task',
          headerShadowVisible: false,
        }}
      />
    </Drawer.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 70 },
        tabBarLabel: '',
      }}
    >
      <Tab.Screen
        name="Home"
        component={MyDrawer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon as={AntDesign} name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="addTask"
        component={AddTask}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon as={MaterialIcons} name="add-task" size={25} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};
const Main = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {session && session.user ? (
          <Stack.Screen name="tabs" component={MyTabs} />
        ) : (
          <>
            <Stack.Screen
              name="welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
