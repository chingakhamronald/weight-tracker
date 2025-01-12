import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ProgressChart from '../components/ProgressChart';
import WeightEntryForm from '../components/WeightEntryForm';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressChart />
      <WeightEntryForm />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
