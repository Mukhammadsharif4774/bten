import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../helpers/colors';
import BurgerIcon from '../assets/icons/burger_icon.png';
import CartIcon from '../assets/icons/cart_icon.png';

const CustomHeaderComponent = ({backgroundColor = COLORS.white}) => {
  const navigation = useNavigation();

  const handleDrawerOpen = () => navigation.openDrawer();
  const navigateToCart = () => navigation.navigate('CartScreen');

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <TouchableOpacity onPress={handleDrawerOpen}>
        <Image source={BurgerIcon} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToCart}>
        <Image source={CartIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 30,
  },
  logoPlaceholder: {
    flex: 1,
  },
});

export default CustomHeaderComponent;
