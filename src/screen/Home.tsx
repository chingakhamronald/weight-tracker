import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import ProgressChart from '../components/ProgressChart';
import Navbar from '../components/Navbar';
import WeightEntryForm from '../components/WeightEntryForm';

const Home = () => {
  return (
    <ScrollView>
      <Navbar />
      <View style={styles.container}>
        <ProgressChart />
        <WeightEntryForm />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 2,
  },
});
