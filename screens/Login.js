import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Box, Button, Text, View } from 'native-base';

import Toast from 'react-native-toast-message';

import TitleComponent from '../components/TitleComponent';
import InputComponent from '../components/InputComponent';
import { colors } from '../constants/color';
import { supabase } from '../lib/supabase';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigateToRegisterScreen = () => {
    navigation.navigate('signUp');
  };

  const handleLogin = async () => {
    if (email === '' || password === '') {
      return Toast.show({
        type: 'error',
        text1: 'Please fill all fields',
      });
    }

    if (!email.includes('@')) {
      return Toast.show({
        type: 'error',
        text1: 'Use a valid email',
      });
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: error.message,
      });
      setLoading(false);

      return;
    }

    if (!error) {
      Toast.show({
        type: 'success',
        text1: 'Welcome',
        text2: 'You have successfully logged in',
      });
      setLoading(false);
    }
  };

  return (
    <Box safeAreaX="5" safeAreaTop="10">
      <View marginTop={3}>
        <TitleComponent title={'Welcome back!'} size={'xl'} />
        <View style={styles.container}>
          <InputComponent
            placeholder={'Email'}
            value={email}
            setValue={setEmail}
            type="email-address"
          />

          <InputComponent
            placeholder={'Password'}
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
          />
        </View>
        <Button isLoading={loading} onPress={handleLogin} style={styles.button}>
          Login
        </Button>
        <View style={styles.textContainer}>
          <Text>Not registered?</Text>
          <Text
            onPress={navigateToRegisterScreen}
            color={'#403572'}
            fontWeight={'semibold'}
            fontSize={'sm'}
          >
            {' '}
            Sign up
          </Text>
        </View>
      </View>
    </Box>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap: 30,
    marginTop: 40,
  },
  button: {
    marginTop: 40,
    height: 50,
    backgroundColor: colors.btnColorPurple,
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
});
