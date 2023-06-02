import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

type Props = {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  type: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: boolean;
  errorMessage?: string;
};

const CustomTextField = ({
  onChangeText,
  placeholder,
  value,
  type,
  errorMessage,
}: Props) => {
  return (
    <View>
      <TextInput
        value={value}
        keyboardType={type}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#5e605f"
      />
      {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 65,
    backgroundColor: '#ecf0ee',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    paddingHorizontal: 18,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    paddingHorizontal: 20,
  },
});

export default CustomTextField;
