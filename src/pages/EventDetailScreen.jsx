import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import {customStyles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import BackIcon from '../assets/icons/back_icon.png';

export default function EventDetailScreen({route}) {
  const navigation = useNavigation();
  const {image} = route.params;

  const handleBackPress = () => {
    navigation.navigate('DrawerNavigator', {screen: 'EventsScreen'});
  };

  return (
    <View style={customStyles.container}>
      <ImageBackground style={customStyles.container} source={image}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image source={BackIcon} style={styles.backIcon} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    margin: 30,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
});
