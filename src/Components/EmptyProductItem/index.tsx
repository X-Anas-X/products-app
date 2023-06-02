import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import i18n from '../../Localization/i18n';

const EmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>{i18n.t('emptyList1')}</Text>
    <Text style={styles.emptyText}>{i18n.t('emptyList2')}</Text>
    <Text style={styles.emptyText}>{i18n.t('emptyList3')}</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#979797',
  },
});

export default EmptyList;
