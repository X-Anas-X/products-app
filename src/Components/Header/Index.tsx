import React from 'react';
import {Text, View, StatusBar, Platform, NativeModules} from 'react-native';
import {GlobalDesign} from '../../Themes/GlobalDesign';
import ChangeLanguage from '../ChangeLanguage';
import i18n from '../../Localization/i18n';
import {UpdateLanguage} from '../../Store/ConfigsReducer';
import {useAppDispatch, useAppSelector} from '../../Store';
import {navigationRef} from '../../Helpers/NavigationRef';
import {setLogout} from '../../Store/AuthReducer';

type Props = {
  title: string;
};

const options =
  Platform.OS === 'ios'
    ? [
        {label: 'English', value: 'en'},
        {label: 'Svenska', value: 'sw'},
      ]
    : [
        {label: `${i18n.t('Language')}`, value: ''},
        {label: 'English', value: 'en'},
        {label: 'Svenska', value: 'sw'},
      ];

export default function Header({title}: Props) {
  const dispatch = useAppDispatch();
  const lng = useAppSelector(state => state.ConfigsReducer.language);

  const logout = () => {
    dispatch(setLogout());
    navigationRef?.current?.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
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
      <View style={GlobalDesign.header}>
        <Text style={GlobalDesign.headerTitle}>{title}</Text>

        <ChangeLanguage
          data={options}
          onSelect={value => {
            dispatch(UpdateLanguage(value));
            setTimeout(() => {
              NativeModules.DevSettings.reload();
            }, 500);
          }}
          placeholder={`${i18n.t('Language')}: ${lng || 'en'}`}
          selectedValue={undefined}
        />
        <Text style={GlobalDesign.logout} onPress={logout}>
          {i18n.t('Logout')}
        </Text>
      </View>
    </View>
  );
}
