import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLOR} from '../constant';

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Text>Navbar</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    backgroundColor: 'red',
  },
});
