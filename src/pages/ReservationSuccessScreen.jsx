import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {customStyles} from '../styles';
import {COLORS, FONTS} from '../helpers/colors';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import MyButtonComponent from '../components/MyButtonComponent';
import {useNavigation} from '@react-navigation/native';
import SmileIcon from '../assets/icons/success_icon.png';

const {width} = Dimensions.get('window');

export default function ReservationSuccessScreen() {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('DrawerNavigator', {
      screen: 'HomeScreen',
    });
  };

  return (
    <View style={customStyles.container}>
      <ImageBackground style={customStyles.container}>
        <CustomHeaderComponent />

        <Image source={SmileIcon} style={styles.icon} />

        <Text style={styles.title}>
          Спасибо!{'\n'}
          Зарезервированный {'\n'} стол
        </Text>

        <MyButtonComponent
          text={'Главная'}
          style={styles.button}
          onPress={handleNavigateToHome}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: FONTS.black,
    color: COLORS.black,
    marginTop: 10,
  },
  icon: {
    width: width * 0.7,
    height: width * 0.7,
    alignSelf: 'center',
    marginTop: 80,
    resizeMode: 'contain',
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
