import React from 'react';
import {StyleSheet, Text, TextStyle, ViewStyle, View} from 'react-native';

type ThemeTextProps = {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  containerStyle?: ViewStyle;
};

const ThemeText: React.FC<ThemeTextProps> = ({
  children,
  style,
  variant = 'body',
  containerStyle,
}) => {
  const variantStyles = styles[variant] || styles.body;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[variantStyles, style]}>{children}</Text>
    </View>
  );
};

export default ThemeText;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  body: {
    fontSize: 16,
    color: '#666',
  },
  caption: {
    fontSize: 12,
    color: '#999',
  },
});
