import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type SeparatorProps = {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  style?: ViewStyle;
};

const Separator: React.FC<SeparatorProps> = ({
  color = '#ccc',
  thickness = 1,
  marginVertical = 3,
  style,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          height: thickness,
          marginVertical: marginVertical,
        },
        style,
      ]}
    />
  );
};

export default Separator;
