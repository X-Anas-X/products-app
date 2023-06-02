import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Product} from '../../types';
import {navigationRef} from '../../Helpers/NavigationRef';

type Props = {
  item: Product;
};

const ProductItem = ({item}: Props) => {
  const onPress = () => {
    navigationRef.current?.navigate('EditProduct', {
      item: item,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.productType}</Text>
      <Text style={styles.text}>{'$ ' + item.price}</Text>
    </View>
    // <TouchableOpacity onPress={onPress} style={styles.container}>
    //   <Text style={styles.text}>{item.name}</Text>
    //   <Text style={styles.text}>{item.productType}</Text>
    //   <Text style={styles.text}>{'$ ' + item.price}</Text>
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#ecf0ee',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 12,
    marginHorizontal: 10,
  },
  text: {
    color: '#979797',
  },
});

export default ProductItem;
