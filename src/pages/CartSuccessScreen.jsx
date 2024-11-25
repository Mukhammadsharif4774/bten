import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {customStyles} from '../styles';
import {COLORS, FONTS} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import MyButtonComponent from '../components/MyButtonComponent';
import {useNavigation} from '@react-navigation/native';

export default function CartSuccessScreen() {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'HomeScreen'});
  };

  return (
    <View style={customStyles.container}>
      <ImageBackground style={customStyles.container}>
        <CustomHeaderComponent />

        <Text style={styles.title}>
          Спасибо!
          {'\n'}Заказ выполнен
        </Text>

        <View style={styles.qrContainer}>
          <QRCode
            value="https://dodopizza.uz/"
            size={Dimensions.get('window').width / 2.5}
            color={COLORS.main}
          />
        </View>

        <MyButtonComponent
          text="НА ГЛАВНУЮ"
          style={styles.button}
          onPress={handleNavigateHome}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontFamily: FONTS.black,
    color: COLORS.main,
    fontSize: 36,
    marginTop: Dimensions.get('window').height * 0.1,
    paddingVertical: 30,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
