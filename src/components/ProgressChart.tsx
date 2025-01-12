import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const ProgressChart = () => {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
    legend: ['Weight Progress'], // optional
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default ProgressChart;

const styles = StyleSheet.create({
  container: {
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#B2C9AD',
  },
});

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: () => `rgba(255, 255, 255, 1)` /* Avoid opacity */,
  strokeWidth: 3,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForBackgroundLines: {
    strokeDasharray: '',
    strokeOpacity: 0.0,
  },

  /* Adjusts the fill of the chart */
  fillShadowGradient: 'transparent',
  fillShadowGradientOpacity: 0,
  fillShadowGradientFromOffset: 0,
  fillShadowGradientTo: 'transparent',
  fillShadowGradientToOpacity: 0,
};
