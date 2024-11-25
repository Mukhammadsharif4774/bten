import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import CloseIcon from './assets/icons/close_icon.png';
import CartIcon from './assets/icons/cart_icon.png';
import Logo from './assets/icons/logo.png';

// Screens
import HomeScreen from './pages/HomeScreen';
import CartScreen from './pages/CartScreen';
import CartSuccessScreen from './pages/CartSuccessScreen';
import ReservationScreen from './pages/ReservationScreen';
import ReservationSuccessScreen from './pages/ReservationSuccessScreen';
import ContactsScreen from './pages/ContactsScreen';
import EventsScreen from './pages/EventsScreen';
import EventDetailScreen from './pages/EventDetailScreen';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          backgroundColor: COLORS.main,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'Главная', screen: 'HomeScreen'},
    {label: 'Корзина', screen: 'CartScreen'},
    {label: 'Контакты', screen: 'ContactsScreen'},
    {label: 'Резерв столика', screen: 'ReservationScreen'},
    {label: 'События ресторана', screen: 'EventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View style={styles.container}>
        <View style={styles.closeIconContainer}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.mainContainer}>
          {drawerItems.map(({label, screen}) => (
            <TouchableOpacity
              key={screen}
              onPress={() => navigateToScreen(screen)}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigateToScreen('CartScreen')}>
          <Image source={CartIcon} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const drawerScreens = [
  {name: 'HomeScreen', component: HomeScreen},
  {name: 'CartScreen', component: CartScreen},
  {name: 'CartSuccessScreen', component: CartSuccessScreen},
  {name: 'ReservationScreen', component: ReservationScreen},
  {name: 'ReservationSuccessScreen', component: ReservationSuccessScreen},
  {name: 'ContactsScreen', component: ContactsScreen},
  {name: 'EventsScreen', component: EventsScreen},
  {name: 'EventDetailScreen', component: EventDetailScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 60,
    height: height - height * 0.06,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 150,
    resizeMode: 'contain',
  },
  mainContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: width,
  },
  drawerItem: {
    width: '75%',
    paddingVertical: 15,
    marginTop: 15,
    borderRadius: 12,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    fontFamily: FONTS.black,
    color: COLORS.black,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 60,
  },
});
