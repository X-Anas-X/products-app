import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import PickerModal from '../../Components/CustomPicker';
import CustomButton from '../../Components/CustomButton';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {navigationRef} from '../../Helpers/NavigationRef';
import i18n from '../../Localization/i18n';
import {
  deleteProductsAction,
  editProductsAction,
} from '../../Store/ConfigsReducer';
import {useAppDispatch} from '../../Store';
import {EditProductType, productTypeEnum} from '../../types';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../NavigationStacks/RootNavigation';
import {Feather} from '@expo/vector-icons';

type ScreenRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

interface Props {
  route: ScreenRouteProp;
}

const EditProduct = ({route}: Props) => {
  const dispatch = useAppDispatch();
  const options = [
    {label: i18n.t('Integrated'), value: productTypeEnum.integrated},
    {label: i18n.t('Peripheral'), value: productTypeEnum.peripheral},
  ];

  const {errors, values, handleChange, handleSubmit, setFieldValue} = useFormik(
    {
      initialValues: {
        name: route.params.item.name,
        price: route.params.item.price,
        type: route.params.item.productType,
      },
      validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number()
          .min(1000, i18n.t('priceError'))
          .max(2600, i18n.t('priceError')),
        type: Yup.string().required(),
      }),
      onSubmit: values => {
        const product: EditProductType = {};

        if (values.name != route.params.item.name) product.name = values.name;
        if (values.price != route.params.item.price)
          product.price = Number(values.price);
        if (values.type != route.params.item.productType)
          product.productType = values.type as productTypeEnum;

        if (Object.keys(product).length > 0) {
          dispatch(editProductsAction(route.params.item?._id ?? '', product));
        }
      },
    },
  );

  const isValidSubmission = () => {
    if (!values.name || !values.price || !values.type) return false;
    if (Object.keys(errors).length > 0) return false;
    return true;
  };

  const goBackValidation = () => {
    if (
      values.name !== route.params.item.name ||
      values.price !== route.params.item.price ||
      values.type !== route.params.item.productType
    )
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

  const deleteAction = () => {
    Alert.alert(
      i18n.t('warning'),
      i18n.t('deleteItem'),
      [
        {text: i18n.t('Cancel'), style: 'cancel'},
        {
          text: i18n.t('Ok'),
          onPress: () => {
            dispatch(deleteProductsAction(route.params.item?._id ?? ''));
          },
        },
      ],
      {cancelable: true},
    );
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

      <View style={styles.deleteWrapper}>
        <View />
        <Text style={styles.headText}>{i18n.t('Edit Product')}</Text>
        <TouchableOpacity onPress={deleteAction}>
          <Feather name="trash-2" size={24} color="red" />
        </TouchableOpacity>
      </View>

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
          value={values.price.toString()}
          type="numeric"
          placeholder={i18n.t('Price')}
          errorMessage={errors.price && values.price ? errors.price : ''}
        />

        <View style={styles.space} />

        <PickerModal
          data={options}
          onSelect={value => {
            setFieldValue('type', value);
          }}
          selectedValue={values.type}
          placeholder={i18n.t('Product Type')}
          errorMessage={errors.type && values.type ? errors.type : ''}
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
  deleteWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 40,
  },
});

export default EditProduct;
