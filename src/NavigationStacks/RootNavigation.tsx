import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../Helpers/NavigationRef';
import ProductList from '../Screens/ProductList';
import ProductForm from '../Screens/ProductForm/Index';
import EditProduct from '../Screens/ProductEdit';
import {Product} from '../types';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import CheckAuthScreen from '../Screens/CheckAuthScreen';

export type RootStackParamList = {
  CheckAuthScreen: undefined;
  Signup: undefined;
  Login: undefined;
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
        initialRouteName={'CheckAuthScreen'}>
        <Screen name="CheckAuthScreen" component={CheckAuthScreen} />
        <Screen name="Signup" component={Signup} />
        <Screen name="Login" component={Login} />
        <Screen name="ListProducts" component={ProductList} />
        <Screen name="ProductForm" component={ProductForm} />
        <Screen name="EditProduct" component={EditProduct} />
      </Navigator>
    </NavigationContainer>
  );
};
export default RootNavigation;
