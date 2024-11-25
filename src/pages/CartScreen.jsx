import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {customStyles} from '../styles';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import {COLORS, FONTS} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItemComponent from '../components/CartItemComponent';
import MyButtonComponent from '../components/MyButtonComponent';
import CartIcon from '../assets/icons/cart_empty_icon.png';

export default function CartScreen() {
  const navigation = useNavigation();
  const {refresh} = useContext(GlobalContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cartList');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    fetchCart();
  }, [refresh]);

  useEffect(() => {
    if (cart.length) {
      const calculatedPrice = cart.reduce(
        (sum, item) => sum + item.price * item.count,
        0,
      );
      setTotalPrice(calculatedPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const handleOrder = () => {
    const destinationScreen = cart.length ? 'CartSuccessScreen' : 'HomeScreen';
    navigation.navigate('DrawerNavigator', {screen: destinationScreen});
  };

  return (
    <View style={customStyles.container}>
      <ImageBackground style={customStyles.container}>
        <CustomHeaderComponent />

        {cart.length ? (
          <ScrollView
            style={customStyles.flex}
            contentContainerStyle={styles.main}>
            {cart.map((item, index) => (
              <CartItemComponent item={item} key={index} />
            ))}

            <View style={[customStyles.row, styles.summaryContainer]}>
              <Text style={styles.sumTitle}>Итого:</Text>
              <Text style={styles.sum}>{totalPrice} $</Text>
            </View>
          </ScrollView>
        ) : (
          <Image style={styles.empty} source={CartIcon} />
        )}

        <MyButtonComponent
          text={cart?.length ? 'Разместить заказ' : 'Главная'}
          style={styles.orderButton}
          onPress={handleOrder}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingBottom: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  empty: {
    marginTop: Dimensions.get('window').height * 0.2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    alignSelf: 'center',
  },
  summaryContainer: {
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  sumTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.main,
    textAlign: 'center',
  },
  sum: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.main,
    textAlign: 'center',
    marginLeft: 20,
  },
  orderButton: {
    position: 'absolute',
    bottom: 50,
  },
});
