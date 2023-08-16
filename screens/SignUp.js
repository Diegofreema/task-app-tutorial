import { Linking, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Box, Button, Text, View, Icon, ScrollView } from 'native-base';
import TitleComponent from '../components/TitleComponent';
import InputComponent from '../components/InputComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { supabase } from '../lib/supabase';
import Toast from 'react-native-toast-message';

export const TERMS =
  'https://www.freeprivacypolicy.com/live/d4773cb7-bd90-4bc9-9a7a-586b5b94543d';
export const POLICY =
  'https://www.freeprivacypolicy.com/live/e96fa01d-7af1-4a94-bb93-e97429904fa8';
const SignUp = ({ navigation }) => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigateToLoginScreen = () => {
    navigation.navigate('login');
  };
  const handleLinks = (url) => {
    Linking.openURL(url);
  };

  const handleSignUp = async () => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Please fill all fields',
      });
    }
    if (accepted === false) {
      return Toast.show({
        type: 'error',
        text1: 'Accept our terms and conditions',
      });
    }
    if (!email.includes('@')) {
      return Toast.show({
        type: 'error',
        text1: 'Use a valid email',
      });
    }
    if (password !== confirmPassword) {
      return Toast.show({
        type: 'error',
        text1: 'Passwords must match',
      });
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: `${firstName} ${lastName}`,
        },
      },
    });
    if (error) {
      console.log(error.message);
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
        text1: 'Successful',
        text2: 'You have successfully created an account',
      });
      setLoading(false);
    }
  };
  // const { mutate, isLoading } = useMutation({
  //   mutationFn: async () => {
  //     await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           name: `${firstName} ${lastName}`,
  //         },
  //       },
  //     });
  //   },
  //   onSuccess: async () => {
  //     Toast.show({
  //       type: 'success',
  //       text1: 'Successful',
  //       text2: 'You have successfully created an account',
  //     });
  //   },
  //   onError: async (error) => {
  //     console.log(error, '118');
  //     Toast.show({
  //       type: 'error',
  //       text1: 'An error occurred',
  //       text2: 'Something went wrong!',
  //     });
  //   },
  // });
  const handleAccepted = () => {
    setAccepted((prevState) => !prevState);
  };
  const handleInput = (value, key) => {
    setInputValues((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  };
  const { confirmPassword, firstName, email, lastName, password } = inputValues;
  console.log(confirmPassword, firstName, email, lastName, password);
  return (
    <Box safeAreaX="5" safeAreaTop="10">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View marginTop={3}>
          <TitleComponent title={'Join the hub!'} size={'xl'} />
          <View style={styles.container}>
            <InputComponent
              placeholder={'First Name'}
              value={inputValues.firstName}
              setValue={(val) => handleInput(val, 'firstName')}
            />
            <InputComponent
              placeholder={'Last Name'}
              value={inputValues.lastName}
              setValue={(val) => handleInput(val, 'lastName')}
            />
            <InputComponent
              placeholder={'Email'}
              value={inputValues.email}
              setValue={(val) => handleInput(val, 'email')}
              type="email-address"
            />

            <InputComponent
              placeholder={'Password'}
              value={inputValues.password}
              setValue={(val) => handleInput(val, 'password')}
              secureTextEntry={true}
            />
            <InputComponent
              placeholder={'Confirm Password'}
              value={inputValues.confirmPassword}
              setValue={(val) => handleInput(val, 'confirmPassword')}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.linkText}>
            <Icon
              onPress={handleAccepted}
              as={MaterialCommunityIcons}
              name={
                accepted ? 'checkbox-intermediate' : 'checkbox-blank-outline'
              }
            />
            <Text>
              I agree to{' '}
              <Text style={styles.textLinks} onPress={() => handleLinks(TERMS)}>
                Terms and Conditions{' '}
              </Text>
              and{' '}
              <Text
                style={styles.textLinks}
                onPress={() => handleLinks(POLICY)}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>
          <Button
            onPress={handleSignUp}
            isLoading={loading}
            style={styles.button}
          >
            Sign up
          </Button>
          <View style={styles.textContainer}>
            <Text>Already have an account?</Text>
            <Text
              onPress={navigateToLoginScreen}
              color={'#403572'}
              fontWeight={'semibold'}
              fontSize={'sm'}
            >
              {' '}
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </Box>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginTop: 40,
  },
  button: {
    marginTop: 40,
    height: 50,
    backgroundColor: '#4681A3',
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  linkText: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    gap: 3,
  },
  textLinks: {
    color: '#8B97A8',
    textDecorationLine: 'underline',
  },
});
