import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {customStyles} from '../styles';
import CustomHeaderComponent from '../components/CustomHeaderComponent';
import {COLORS, FONTS} from '../helpers/colors';
import {products} from '../helpers/data';
import MenuComponent from '../components/MenuComponent';
import {GlobalContext} from '../components/GlobalContext';

const CategoryButton = ({label, active, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.categoryItem}>
    <Text style={active ? styles.categoryActive : styles.category}>
      {label}
    </Text>
    {active && <View style={styles.underline} />}
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [category, setCategory] = React.useState(0);
  const {refresh, setRefresh} = useContext(GlobalContext);

  const handleCategoryChange = index => {
    setCategory(index);
    setRefresh(!refresh);
  };

  return (
    <View style={customStyles.container}>
      <SafeAreaView />
      <CustomHeaderComponent />

      <View style={styles.categoryContainer}>
        {['Итальянская', 'Мексиканская', 'Американская'].map((label, index) => (
          <CategoryButton
            key={index}
            label={label}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
          />
        ))}
      </View>

      <ScrollView style={customStyles.flex} contentContainerStyle={styles.main}>
        {products[category].map((product, index) => (
          <MenuComponent key={index} item={product} />
        ))}
      </ScrollView>
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
    paddingHorizontal: 10,
  },
  categoryContainer: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  categoryItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },
  category: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  categoryActive: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    height: 2,
    backgroundColor: COLORS.main,
    marginTop: 10,
  },
});
