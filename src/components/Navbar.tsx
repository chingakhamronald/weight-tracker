import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThemeText from './ThemeText';

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image/profile.jpg')}
        style={styles.avatar}
      />
      <ThemeText variant="title">myfittrack</ThemeText>
      <Text>Navbar</Text>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});
