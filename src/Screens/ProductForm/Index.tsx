import React, {useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar, Platform, Alert} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import PickerModal from '../../Components/CustomPicker';
import CustomButton from '../../Components/CustomButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {navigationRef} from '../../Helpers/NavigationRef';
import i18n from '../../Localization/i18n';
import {Product, productTypeEnum} from '../../types';
import {useAppDispatch} from '../../Store';
import {createProductsAction} from '../../Store/ConfigsReducer';

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const options = [
    {label: i18n.t('Integrated'), value: productTypeEnum.integrated},
    {label: i18n.t('Peripheral'), value: productTypeEnum.peripheral},
  ];

  const validationSchema = Yup.lazy(value => {
    return Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number()
        .min(
          value.type === productTypeEnum.integrated ? 1000 : 1,
          i18n.t('priceError'),
        )
        .max(
          value.type === productTypeEnum.integrated ? 2600 : Infinity,
          i18n.t('priceError'),
        ),
      type: Yup.string().required(),
    });
  });

  const {errors, values, handleChange, handleSubmit, setFieldValue} = useFormik(
    {
      initialValues: {
        name: '',
        price: '',
        type: '',
      },
      validationSchema,
      onSubmit: values => {
        const product: Product = {
          name: values.name,
          price: Number(values.price),
          productType: values.type as productTypeEnum,
        };

        dispatch(createProductsAction(product, i18n.t));
      },
    },
  );

  const isValidSubmission = () => {
    if (values.name === '' || values.price === '' || values.type === '')
      return false;
    if (Object.keys(errors).length > 0) return false;
    return true;
  };

  const goBackValidation = () => {
    if (values.name !== '' || values.price !== '' || values.type !== '')
      return Alert.alert(
        i18n.t('warning'),
        i18n.t('formChanges'),
        [
          {text: i18n.t('Cancel'), style: 'cancel'},
          {text: 'Ok', onPress: () => navigationRef.current?.goBack()},
        ],
        {cancelable: true},
      );
    return navigationRef.current?.goBack();
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
      <View style={styles.topSpace} />

      <Text style={styles.headText}>Create New Product</Text>
      <View style={styles.inputsWrapper}>
        <CustomTextField
          onChangeText={handleChange('name')}
          value={values.name}
          type="default"
          placeholder={i18n.t('Name')}
          errorMessage={errors.name && values.name != '' ? errors.name : ''}
        />

        <View style={styles.space} />

        <CustomTextField
          onChangeText={handleChange('price')}
          value={values.price}
          type="numeric"
          placeholder={i18n.t('Price')}
          errorMessage={errors.price && values.price != '' ? errors.price : ''}
        />

        <View style={styles.space} />

        <PickerModal
          data={options}
          onSelect={value => {
            setFieldValue('type', value);
          }}
          selectedValue={values.type}
          placeholder={i18n.t('Product Type')}
          errorMessage={errors.type && values.type != '' ? errors.type : ''}
        />

        <View style={styles.space} />

        <View style={styles.buttonsWrapper}>
          <CustomButton
            disabled={!isValidSubmission()}
            onPress={() => handleSubmit()}
          />
          <CustomButton
            onPress={goBackValidation}
            backgroundColor="#ecf0ee"
            title={i18n.t('CANCEL')}
            titleColor="#000"
            icon="prohibited"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
});

export default ProductForm;
