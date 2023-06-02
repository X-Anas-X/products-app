import React from 'react';
import {Text, View, StatusBar, Platform} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import CustomButton from '../../Components/CustomButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import i18n from '../../Localization/i18n';
import {User} from '../../types';
import {useAppDispatch} from '../../Store';
import {LoginAction} from '../../Store/AuthReducer';
import {authStyles} from './Signup';
import {navigationRef} from '../../Helpers/NavigationRef';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../NavigationStacks/RootNavigation';

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

const Login = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const {errors, values, handleChange, handleSubmit, setFieldValue} = useFormik(
    {
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      }),
      onSubmit: values => {
        const user: User = {
          email: values.email,
          password: values.password,
        };

        dispatch(LoginAction(user));
      },
    },
  );

  const isValidSubmission = () => {
    if (values.email === '' || values.password === '') return false;
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

      <Text style={authStyles.headText}>{i18n.t('Login')}</Text>

      <View style={authStyles.inputsWrapper}>
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
          onPress={() => navigation.navigate('Signup')}
          style={authStyles.navigateButton}>
          {i18n.t('Sign up')}
        </Text>
      </View>
    </View>
  );
};

export default Login;
