import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {customStyles} from '../styles';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import {COLORS, FONTS} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import MyButtonComponent from '../components/MyButtonComponent';

export default function ContactsScreen() {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'HomeScreen'});
  };

  const renderTextInput = placeholder => (
    <TextInput
      style={styles.textInput}
      placeholderTextColor={COLORS.black}
      placeholder={placeholder}
      editable={false}
    />
  );

  return (
    <View style={customStyles.container}>
      <CustomHeaderComponent />

      <Text style={styles.title}>Контакты</Text>

      <View style={styles.main}>
        {renderTextInput('Индекс')}
        {renderTextInput('Страна')}
        {renderTextInput('Город')}
        {renderTextInput('Телефон')}
      </View>

      <MyButtonComponent
        text="Главная"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: FONTS.black,
    color: COLORS.main,
    paddingTop: 30,
    textAlign: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  textInput: {
    height: 50,
    width: '95%',
    marginVertical: 10,
    fontSize: 12,
    fontFamily: FONTS.regular,
    borderWidth: 1.5,
    borderColor: COLORS.main,
    paddingLeft: 20,
    borderRadius: 12,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
