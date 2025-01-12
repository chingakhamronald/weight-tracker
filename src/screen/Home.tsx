import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProgressChart from '../components/ProgressChart';
import Navbar from '../components/Navbar';
import WeightEntryForm from '../components/WeightEntryForm';

const Home = () => {
  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <ProgressChart />
        <WeightEntryForm />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 2,
  },
});
