import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from './GlobalContext';
import {COLORS, FONTS} from '../helpers/colors';
import TrashIcon from '../assets/icons/trash_icon.png';
import {allProducts} from '../helpers/data';
import PlusIcon from '../assets/icons/icon_plus.png';
import MinusIcon from '../assets/icons/minus_icon.png';

const CartItemComponent = ({item}) => {
  const {refresh, setRefresh} = useContext(GlobalContext);
  const [carts, setCarts] = useState([]);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    setRefresh(!refresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0); // Remove item if count is zero
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
    };
    fetchCartItems();
  }, [refresh]);

  const productImage = allProducts.find(p => p.name === item.name)?.image;

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.image} />

      <View style={styles.details}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.currencyText}>{`${item.price} $`}</Text>

          <View style={styles.countContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                carts.find(product => product.name === item.name)?.count > 1
                  ? decrement()
                  : deleteItem()
              }>
              <Image source={MinusIcon} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.count}>
              {carts.find(product => product.name === item.name)?.count || 0}
            </Text>

            <TouchableOpacity style={styles.actionButton} onPress={increment}>
              <Image source={PlusIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
            <Image source={TrashIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: 100,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  description: {
    fontSize: 13,
    fontFamily: FONTS.light,
    color: COLORS.gray,
  },
  currencyText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.main,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  count: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginHorizontal: 10,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    bottom: 55,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

export default CartItemComponent;
