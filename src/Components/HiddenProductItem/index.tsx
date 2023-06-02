import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Feather, AntDesign} from '@expo/vector-icons';
import {Product} from '../../types';

interface HiddenComponentProps {
  item: Product;
  deleteAction: (id: string) => void;
  onPressEdit: (item: Product) => void;
}

const HiddenComponentItem = ({
  item,
  deleteAction,
  onPressEdit,
}: HiddenComponentProps) => (
  <View style={styles.hiddenItem}>
    <TouchableOpacity
      onPress={() => deleteAction(item._id ?? '')}
      style={styles.hiddenDeleteIcon}>
      <Feather name="trash-2" size={24} color="red" />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPressEdit(item)}
      style={styles.hiddenEditIcon}>
      <AntDesign name="edit" size={24} color="#008000" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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

export default HiddenComponentItem;
