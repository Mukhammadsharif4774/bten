import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from './GlobalContext';
import {COLORS, FONTS} from '../helpers/colors';
import America from '../assets/icons/america.png';
import Italy from '../assets/icons/italy.png';
import PlusIcon from '../assets/icons/plus_icon.png';
import MinusIcon from '../assets/icons/minus_icon.png';
import {allProducts} from '../helpers/data';

export default function MenuComponent({item}) {
  const {refresh, setRefresh} = useContext(GlobalContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    setRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, refresh]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image source={item?.image} style={styles.image} />

        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <Image
              source={
                allProducts.findIndex(pro => pro.name === item?.name) < 3
                  ? America
                  : Italy
              }
              style={styles.flag}
            />
            <Text style={styles.title}>{item?.name}</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.statusContainer}
              onPress={toggleCart}>
              <Image
                source={added ? MinusIcon : PlusIcon}
                style={styles.plusIcon}
              />
            </TouchableOpacity>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>{item?.price} $</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    alignSelf: 'center',
    height: 250,
    elevation: 5,
    marginTop: 80,
  },
  container: {
    width: '100%',
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    objectFit: 'contain',
    marginTop: -60,
  },
  rightContainer: {
    width: '100%',
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    marginLeft: 8,
  },
  row: {
    width: '90%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  price: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
  flag: {
    width: 30,
    height: 20,
  },
});
