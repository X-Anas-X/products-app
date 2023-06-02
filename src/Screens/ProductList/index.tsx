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
import {Feather, FontAwesome5} from '@expo/vector-icons';
import i18n from '../../Localization/i18n';
// @ts-ignore
import gif from '../../../assets/gif.gif';
import {useAppDispatch, useAppSelector} from '../../Store';
import {
  deleteProductsAction,
  getProductsAction,
} from '../../Store/ConfigsReducer';
import {SwipeListView} from 'react-native-swipe-list-view';
import {AntDesign} from '@expo/vector-icons';
import {navigationRef} from '../../Helpers/NavigationRef';
import {Product} from '../../types';

const ProductList = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const navigateToProductForm = () => {
    props.navigation.navigate('ProductForm');
  };

  const [pressMe, setPressMe] = React.useState(false);
  const products = useAppSelector(state => state.ConfigsReducer.products);

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{i18n.t('emptyList1')}</Text>
      <Text style={styles.emptyText}>{i18n.t('emptyList2')}</Text>
      <Text style={styles.emptyText}>{i18n.t('emptyList3')}</Text>
    </View>
  );

  const HiddenComponent = (data: {item: Product}) => (
    <View style={styles.hiddenItem}>
      <TouchableOpacity
        onPress={() => deleteAction(data.item._id ?? '')}
        style={styles.hiddenDeleteIcon}>
        <Feather name="trash-2" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressEdit(data.item)}
        style={styles.hiddenEditIcon}>
        <AntDesign name="edit" size={24} color="#008000" />
      </TouchableOpacity>
    </View>
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  const deleteAction = (id: string) => {
    Alert.alert(
      i18n.t('warning'),
      i18n.t('deleteItem'),
      [
        {text: i18n.t('Cancel'), style: 'cancel'},
        {
          text: i18n.t('Ok'),
          onPress: () => {
            dispatch(deleteProductsAction(id));
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
        ListEmptyComponent={EmptyList}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#979797',
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
  hiddenItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenDeleteIcon: {
    marginLeft: 20,
    marginTop: 10,
  },
  hiddenEditIcon: {
    marginLeft: 10,
    marginTop: 10,
  },
});

export default ProductList;
