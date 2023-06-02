import {createSlice} from '@reduxjs/toolkit';
import {AppThunk} from '.';
import {apiRequest} from '../Utils/api';
import {User} from '../types';
import {Alert} from 'react-native';
import {navigationRef} from '../Helpers/NavigationRef';
import {finishLoading, startLoading} from './ConfigsReducer';

// slices and reducers actions

interface InitialState {
  account: User | null;
}

const slice = createSlice({
  name: 'authReducer',
  initialState: {
    account: null,
  } as InitialState,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    setLogout: state => {
      state.account = null;
    },
  },
});

export default slice.reducer;

//Actions pattern
export const {setAccount, setLogout} = slice.actions;

export const SignupAction =
  (variables: User): AppThunk =>
  async dispatch => {
    dispatch(startLoading());
    try {
      const {data} = await apiRequest<User>({
        url: 'signup',
        method: 'POST',
        data: variables,
      });
      dispatch(setAccount(data));
      navigationRef?.current?.reset({
        index: 0,
        routes: [{name: 'ListProducts'}],
      });
      Alert.alert('Success', 'User created successfully');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      dispatch(finishLoading());
    }
  };

export const LoginAction =
  (variables: User): AppThunk =>
  async dispatch => {
    dispatch(startLoading());
    try {
      const {data} = await apiRequest<User>({
        url: 'signin',
        method: 'POST',
        data: variables,
      });
      dispatch(setAccount(data));
      navigationRef?.current?.reset({
        index: 0,
        routes: [{name: 'ListProducts'}],
      });
    } catch (error) {
      Alert.alert('Error', "User doesn't exist");
    } finally {
      dispatch(finishLoading());
    }
  };
