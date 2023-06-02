import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../../Components/Header/Index';
import ProductItem from '../../Components/ProductItem';
import {FontAwesome5} from '@expo/vector-icons';
import i18n from '../../Localization/i18n';
import {useAppDispatch} from '../../Store';
import {deleteProductsAction} from '../../Store/ConfigsReducer';
import {SwipeListView} from 'react-native-swipe-list-view';
import {navigationRef} from '../../Helpers/NavigationRef';
import {Product} from '../../types';
import useProducts from '../../Hooks/getProductsHook';
import EmptyList from '../../Components/EmptyProductItem';
import HiddenComponentItem from '../../Components/HiddenProductItem';
// @ts-ignore
import gif from '../../../assets/gif.gif';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../NavigationStacks/RootNavigation';

export type ListProductsSignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ListProducts'
>;

interface Props {
  navigation: ListProductsSignUpScreenNavigationProp;
}

const ProductList = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const {products} = useProducts();
  const [pressMe, setPressMe] = React.useState(false);

  const HiddenComponent = (data: {item: Product}) => (
    <HiddenComponentItem
      item={data.item}
      deleteAction={deleteAction}
      onPressEdit={onPressEdit}
    />
  );

  const deleteAction = (id: string) => {
    Alert.alert(
      i18n.t('warning'),
      i18n.t('deleteItem'),
      [
        {text: i18n.t('Cancel'), style: 'cancel'},
        {
          text: i18n.t('Ok'),
          onPress: () => {
            dispatch(deleteProductsAction(id, true));
          },
        },
      ],
      {cancelable: true},
    );
  };

  const onPressEdit = (item: Product) => {
    navigationRef.current?.navigate('EditProduct', {
      item: item,
    });
  };

  const navigateToProductForm = () => {
    navigation.navigate('ProductForm');
  };

  return (
    <>
      <Header title={i18n.t('Items')} />

      <View style={styles.headWrapper}>
        <Text>{i18n.t('Name')}</Text>
        <Text> {i18n.t('Type')}</Text>
        <Text> {i18n.t('Price')}</Text>
      </View>

      <View
        style={
          products.length > 0 ? styles.itemsWrapper : styles.emptyContainer
        }
      />

      {pressMe && (
        <View style={styles.pressMeGifWrapper}>
          <Image source={gif} />
        </View>
      )}

      <SwipeListView
        data={products || []}
        renderItem={({item}) => <ProductItem item={item} />}
        renderHiddenItem={HiddenComponent}
        ListEmptyComponent={() => <EmptyList />}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        keyExtractor={(item, index) => index.toString()}
        leftOpenValue={75}
        rightOpenValue={-75}
      />

      <TouchableOpacity onPress={navigateToProductForm}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPressMe(!pressMe)}>
        <View style={styles.pressMeWrapper}>
          <Text style={styles.pressMeText}> {i18n.t('Press Me')}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  headWrapper: {
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  itemsWrapper: {
    marginTop: 10,
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#008000',
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressMeWrapper: {
    position: 'absolute',
    bottom: 35,
    left: 25,
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressMeText: {
    color: '#FFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pressMeGifWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ProductList;
