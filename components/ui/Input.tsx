import React from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
} from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input({
  label,
  icon,
  error,
  style,
  ...props
}: InputProps) {
  return (
    <View style={{ width: '100%' }}>
      {label && (
        <Text
          style={{
            color: '#8D5241',
            fontFamily: 'Inter_500Medium',
            fontSize: 16,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: error ? '#EF4444' : '#8D5241',
          borderRadius: 20,
          paddingHorizontal: 12,
          height: 48,
          backgroundColor: 'transparent',
        }}
      >
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        <TextInput
          style={[
            {
              flex: 1,
              height: 48,
              color: '#8D5241',
              fontSize: 14,
            },
            style,
          ]}
          placeholderTextColor="rgba(166, 123, 91, 0.5)"
          {...props}
        />
      </View>
      {error && (
        <Text
          style={{
            color: '#EF4444',
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
