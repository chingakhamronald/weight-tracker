import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {useWeightStore} from '../store';

const ProgressChart = () => {
  const screenWidth = Dimensions.get('window').width;
  const {weightData: weightStore} = useWeightStore(state => state);

  const weightData = weightStore.map(e => parseInt(e.weight));

  const labelsData = weightStore.map((e: any) => {
    const dateLabels = moment(e?.date).format('DD/MM');
    return dateLabels;
  });

  const defaultLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];

  const defaultWeights = [0, 0, 0, 0, 0];

  const data = {
    labels: labelsData.length > 0 ? labelsData.slice(-5) : defaultLabels,
    datasets: [
      {
        data: weightData.length > 0 ? weightData.slice(-5) : defaultWeights,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: ['Weight Progress'],
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
    borderRadius: 15,
    backgroundColor: '#B2C9AD',
  },
});

const chartConfig = {
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  color: () => `rgba(0, 0, 0, 1)` /* Avoid opacity */,
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
