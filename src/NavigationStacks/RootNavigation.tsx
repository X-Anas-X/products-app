import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../Helpers/NavigationRef';
import ProductList from '../Screens/ProductList';
import ProductForm from '../Screens/ProductForm/Index';
import EditProduct from '../Screens/ProductEdit';
import {Product} from '../types';

export type RootStackParamList = {
  ListProducts: undefined;
  ProductForm: undefined;
  EditProduct: {item: Product};
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
        initialRouteName={'ListProducts'}>
        <Screen name="ListProducts" component={ProductList} />
        <Screen name="ProductForm" component={ProductForm} />
        <Screen name="EditProduct" component={EditProduct} />
      </Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
