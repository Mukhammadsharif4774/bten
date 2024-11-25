import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {customStyles} from '../styles';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import {COLORS, FONTS} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import Event1 from '../assets/backgrounds/event_1.png';
import Event2 from '../assets/backgrounds/event_2.png';
import Event3 from '../assets/backgrounds/event_3.png';
import Event4 from '../assets/backgrounds/event_4.png';
import BackgroundImage from '../assets/backgrounds/events_background.png';
export default function EventsScreen() {
  const navigation = useNavigation();
  return (
    <View style={[customStyles.container, {backgroundColor: COLORS.main}]}>
      <ImageBackground style={customStyles.container} source={BackgroundImage}>
        <CustomHeaderComponent backgroundColor={'transparent'} />

        <Text style={styles.title}>События ресторана</Text>

        <ScrollView
          style={customStyles.flex}
          contentContainerStyle={customStyles.scroll}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('DrawerNavigator', {
                screen: 'EventDetailScreen',
                params: {image: Event1},
              })
            }>
            <Text style={styles.buttonTitle}>Пицца и Кино</Text>
            <Text style={styles.time}>17.02.2025 20:00</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('DrawerNavigator', {
                screen: 'EventDetailScreen',
                params: {image: Event2},
              })
            }>
            <Text style={styles.buttonTitle}>
              Мастер-класс по приготовлению пиццы
            </Text>
            <Text style={styles.time}>24.02.2025 19:00</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('DrawerNavigator', {
                screen: 'EventDetailScreen',
                params: {image: Event3},
              })
            }>
            <Text style={styles.buttonTitle}>Олимпийский бранч</Text>
            <Text style={styles.time}>01.02.2025 16:00</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('DrawerNavigator', {
                screen: 'EventDetailScreen',
                params: {image: Event4},
              })
            }>
            <Text style={styles.buttonTitle}>Вечер Футбола </Text>
            <Text style={styles.time}>05.02.2025 21:00</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: FONTS.black,
    color: COLORS.main,
    padding: 30,
    textAlign: 'center',
  },
  main: {
    width: '100%',
    padding: 20,
  },
  button: {
    width: '70%',
    alignSelf: 'center',
    height: 60,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.main,
    marginTop: 30,
    position: 'relative',
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONTS.black,
    color: COLORS.main,
  },
  time: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: FONTS.regular,
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    position: 'absolute',
    top: '-60%',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
