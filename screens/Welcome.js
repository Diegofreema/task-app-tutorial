import { StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Button, Image, Text, View } from 'native-base';
import TitleComponent from '../components/TitleComponent';
import { colors } from '../constants/color';

const { height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate('login');
  };
  const navigateToSignUp = () => {
    navigation.navigate('signUp');
  };
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/image.png')}
        style={styles.imageStyle}
        alt="image"
      />
      <View style={styles.overlay} />
      <View backgroundColor={'black'} style={styles.container}>
        <TitleComponent title={'Best task manager app'} />
        <Text style={styles.text}>
          Get organized by sorting out all your tasks and boost your
          productivity.
        </Text>
        <View style={styles.btnContainer}>
          <Button
            backgroundColor={colors.btnColorPurple}
            onPress={navigateToLogin}
            rounded={'md'}
          >
            Login
          </Button>
          <Button
            backgroundColor={'#4681A3'}
            onPress={navigateToSignUp}
            rounded={'md'}
          >
            Get Started
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  imageStyle: {
    height: height * 0.6,
    width: '100%',
  },
  container: {
    width: '100%',
    height: height * 0.4,
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    marginTop: -20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 20,
    fontWeight: '400',
    color: colors.textColor,
    width: '72%',
  },
  btnContainer: { width: '70%', marginTop: 30, gap: 10 },
});
