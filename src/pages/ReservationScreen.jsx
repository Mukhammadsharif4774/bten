import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, TextInput} from 'react-native';
import {customStyles} from '../styles';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import {COLORS, FONTS} from '../helpers/colors';
import MyButtonComponent from '../components/MyButtonComponent';
import {useNavigation} from '@react-navigation/native';

const InputField = ({placeholder, value, onChangeText}) => (
  <TextInput
    style={styles.textInput}
    placeholderTextColor={COLORS.textInputPlaceHolder}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
  />
);

export default function ReservationScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    table: '',
    time: '',
    date: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleReservation = () => {
    // Additional validation and logic can be added here
    navigation.navigate('DrawerNavigator', {
      screen: 'ReservationSuccessScreen',
    });
  };

  return (
    <View style={customStyles.container}>
      <CustomHeaderComponent />
      <Text style={styles.title}>Реезрв столика</Text>

      <ScrollView style={customStyles.flex} contentContainerStyle={styles.main}>
        <InputField
          placeholder={'Полное имя'}
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />

        <InputField
          placeholder={'Номер телефона'}
          value={formData.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />

        <InputField
          placeholder={'Дата'}
          value={formData.table}
          onChangeText={text => handleInputChange('table', text)}
        />

        <TextInput
          style={[styles.textInput, {height: 150}]}
          multiline={true}
          placeholder={'Комментарий'}
          numberOfLines={4}
          textAlignVertical={'top'}
        />
      </ScrollView>

      <MyButtonComponent
        text={'Зарезервировать'}
        style={styles.button}
        onPress={handleReservation}
      />
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
    paddingBottom: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
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
