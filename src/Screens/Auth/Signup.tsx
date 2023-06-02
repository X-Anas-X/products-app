import React from 'react';
import {Text, View, StyleSheet, StatusBar, Platform} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import CustomButton from '../../Components/CustomButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import i18n from '../../Localization/i18n';
import {User} from '../../types';
import {useAppDispatch} from '../../Store';
import {SignupAction} from '../../Store/AuthReducer';
import {navigationRef} from '../../Helpers/NavigationRef';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../NavigationStacks/RootNavigation';

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const Signup = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const {errors, values, handleChange, handleSubmit} = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: values => {
      const user: User = {
        username: values.username,
        email: values.email.toLowerCase(),
        password: values.password,
      };

      dispatch(SignupAction(user));
    },
  });

  const isValidSubmission = () => {
    if (values.username === '' || values.email === '' || values.password === '')
      return false;
    if (Object.keys(errors).length > 0) return false;
    return true;
  };

  return (
    <View>
      {Platform.OS === 'ios' ? (
        <View>
          <View style={{backgroundColor: '#1a76d2', height: 50}} />
          <StatusBar barStyle="light-content" />
        </View>
      ) : (
        <StatusBar backgroundColor="#1a76d2" barStyle={'light-content'} />
      )}

      <View style={authStyles.topSpace} />

      <Text style={authStyles.headText}>{i18n.t('Sign up')}</Text>

      <View style={authStyles.inputsWrapper}>
        <CustomTextField
          onChangeText={handleChange('username')}
          value={values.username}
          type="default"
          placeholder={i18n.t('UserName')}
          errorMessage={
            errors.username && values.username != '' ? errors.username : ''
          }
        />

        <View style={authStyles.space} />

        <CustomTextField
          onChangeText={handleChange('email')}
          value={values.email}
          type="email-address"
          placeholder={i18n.t('Email')}
          errorMessage={errors.email && values.email != '' ? errors.email : ''}
        />

        <View style={authStyles.space} />

        <CustomTextField
          onChangeText={handleChange('password')}
          value={values.password}
          type="default"
          secured={true}
          placeholder={i18n.t('Password')}
          errorMessage={
            errors.password && values.password != '' ? errors.password : ''
          }
        />
        <View style={authStyles.space} />

        <View style={authStyles.buttonsWrapper}>
          <CustomButton
            title={i18n.t('Submit')}
            disabled={!isValidSubmission()}
            onPress={() => handleSubmit()}
          />
        </View>
        <View style={authStyles.space} />

        <Text
          style={authStyles.navigateButton}
          onPress={() => navigation.navigate('Login')}>
          {i18n.t('Login')}
        </Text>
      </View>
    </View>
  );
};

export const authStyles = StyleSheet.create({
  container: {},
  headText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  inputsWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  space: {
    height: 40,
  },
  topSpace: {
    height: 20,
  },
  picker: {
    height: 65,
    backgroundColor: '#ecf0ee',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navigateButton: {
    color: '#1a76d2',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Signup;
