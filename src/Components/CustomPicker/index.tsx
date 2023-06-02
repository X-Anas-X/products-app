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

const PickerModal = ({
  data,
  onSelect,
  selectedValue,
  placeholder,
  errorMessage,
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
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => {
              onSelect(itemValue);
              hidePicker();
            }}
            style={{paddingVertical: 10}}
            hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
            visible={pickerVisible}>
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
      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    padding: 22,
    backgroundColor: '#ecf0ee',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  androidPickerWrapper: {
    paddingVertical: 5,
    backgroundColor: '#ecf0ee',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  placeholder: {
    fontSize: 16,
    color: '#5e605f',
  },
  selectedValue: {
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    paddingHorizontal: 20,
    fontSize: 12,
    marginTop: 5,
  },
});

export default PickerModal;
