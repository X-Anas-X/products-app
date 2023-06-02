import React, {useEffect} from 'react';
import {useAppSelector} from '../../Store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../NavigationStacks/RootNavigation';

export type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'CheckAuthScreen'
>;

interface Props {
  navigation: NavigationProp;
}

const CheckAuthScreen = ({navigation}: Props) => {
  const account = useAppSelector(state => state.AuthReducer.account);

  useEffect(() => {
    if (account) {
      navigation.replace('ListProducts');
    } else {
      navigation.replace('Login');
    }
  }, [account]);

  return <></>;
};

export default CheckAuthScreen;
