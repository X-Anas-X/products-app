import {NavigationContainerRef} from '@react-navigation/native';
import {createRef} from 'react';
import {RootStackParamList} from '../NavigationStacks/RootNavigation';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

export const goBack = () => {
  navigationRef.current?.goBack();
};
export const doubleGoBack = () => {
  setImmediate(() => {
    navigationRef.current?.goBack();
    navigationRef.current?.goBack();
  });
};
