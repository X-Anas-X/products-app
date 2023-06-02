import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../Store';
import {getProductsAction} from '../Store/ConfigsReducer';

const useProducts = () => {
  const products = useAppSelector(state => state.ConfigsReducer.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  return {products};
};

export default useProducts;
