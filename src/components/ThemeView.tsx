import React, {FC, ReactNode} from 'react';
import {StyleSheet, ViewStyle, View} from 'react-native';

type ThemeViewProps = {
  children: ReactNode;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
};

const ThemeView: FC<ThemeViewProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default ThemeView;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});
