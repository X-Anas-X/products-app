import React, {useState} from 'react';
import {Text, View, StyleSheet, Platform, ActionSheetIOS} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import i18n from '../../Localization/i18n';

type Props = {
  data: {label: string; value: string}[];
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
  placeholder: string;
  errorMessage?: string;
};

const ChangeLanguage = ({
  data,
  onSelect,
  selectedValue,
  placeholder,
}: Props) => {
  const [pickerVisible, setPickerVisible] = useState(false);

  const showPicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            ...data.map((item: {label: any}) => item.label),
            i18n.t('Cancel'),
          ],
          cancelButtonIndex: data.length,
          destructiveButtonIndex: data.length,
        },
        index => {
          if (index !== -1 && index !== data.length) {
            onSelect(data[index].value);
          }
        },
      );
    } else {
      setPickerVisible(true);
    }
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  return (
    <View>
      {Platform.OS === 'ios' && (
        <Text onPress={showPicker} style={styles.pickerWrapper}>
          {selectedValue ? (
            <Text style={styles.selectedValue}>{selectedValue}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
        </Text>
      )}
      {Platform.OS === 'android' && (
        <View style={styles.androidPickerWrapper}>
          <Text style={styles.placeholder}>{placeholder}</Text>
          <Picker
            style={styles.androidPicker}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              onSelect(itemValue);
              hidePicker();
            }}
            dropdownIconColor={'#FFFF'}
            placeholder={placeholder}>
            {data.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {},
  androidPickerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  androidPicker: {
    width: 40,
  },
  placeholder: {
    fontSize: 16,
    color: '#FFFF',
    fontWeight: 'bold',
  },
  selectedValue: {
    fontSize: 16,
    color: '#FFFF',
    fontWeight: 'bold',
  },
});

export default ChangeLanguage;
