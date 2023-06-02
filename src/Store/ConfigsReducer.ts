import {createSlice} from '@reduxjs/toolkit';
import {AppThunk} from '.';
import {apiRequest} from '../Utils/api';
import {EditProductType, Product} from '../types';
import {Alert} from 'react-native';
import {navigationRef} from '../Helpers/NavigationRef';

// slices and reducers actions

interface InitialState {
  language: string;
  isLoading: boolean;
  products: Product[];
}

const slice = createSlice({
  name: 'configsReducer',
  initialState: {
    language: '',
    isLoading: false,
    products: [],
  } as InitialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    startLoading: state => {
      state.isLoading = true;
    },
    finishLoading: state => {
      state.isLoading = false;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export default slice.reducer;

//Actions pattern
export const {setLanguage, startLoading, finishLoading, setProducts} =
  slice.actions;

export const UpdateLanguage = (lng: string): AppThunk => {
  return dispatch => {
    dispatch(setLanguage(lng));
  };
};

export const getProductsAction = (): AppThunk => async dispatch => {
  try {
    const {data} = await apiRequest<[Product]>({
      url: 'products',
      method: 'GET',
    });
    dispatch(setProducts(data));
  } catch (error) {}
};

export const createProductsAction =
  (variables: Product): AppThunk =>
  async dispatch => {
    try {
      await apiRequest<boolean>({
        url: 'products',
        method: 'POST',
        data: variables,
      });
      dispatch(getProductsAction());
      navigationRef.current?.goBack();
      Alert.alert('Success', 'Product created');
    } catch (error) {}
  };

export const editProductsAction =
  (id: string, variables: EditProductType): AppThunk =>
  async dispatch => {
    try {
      await apiRequest<boolean>({
        url: 'products/' + id,
        method: 'patch',
        data: variables,
      });
      dispatch(getProductsAction());
      navigationRef.current?.goBack();
      Alert.alert('Success', 'Product updated');
    } catch (error) {}
  };

export const deleteProductsAction =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      await apiRequest<boolean>({
        url: 'products/' + id,
        method: 'DELETE',
      });
      dispatch(getProductsAction());
      navigationRef.current?.goBack();
      Alert.alert('Success', 'Product deleted');
    } catch (error) {}
  };
