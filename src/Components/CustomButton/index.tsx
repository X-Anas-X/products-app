import React from 'react';
import {TouchableOpacity, Text, TouchableOpacityProps} from 'react-native';
import {Feather, Foundation} from '@expo/vector-icons';
import i18n from '../../Localization/i18n';

interface ButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
  width?: number;
  backgroundColor?: string;
  icon?: string;
  title?: string;
  titleColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  disabled,
  width = 170,
  backgroundColor = '#008000',
  icon,
  title = i18n.t('SAVE'),
  titleColor,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        width,
        height: 50,
        backgroundColor: backgroundColor,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.3 : 1,
      }}
      disabled={disabled}
      {...props}>
      <Text
        style={{
          color: titleColor ? 'black' : 'white',
          marginRight: 5,
          fontSize: 20,
        }}>
        {title}
      </Text>
      {icon ? (
        <Foundation name="prohibited" size={30} color="white" />
      ) : (
        <Feather name={'download'} size={30} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
