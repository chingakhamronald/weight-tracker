import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const ProgressChart = () => {
  const [weightData, setWeightData] = useState<number[]>([]);
  const [labelsData, setLabelsData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: labelsData.slice(-5),
    datasets: [
      {
        data: weightData.slice(-5),
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 3,
      },
    ],
    legend: ['Weight Progress'],
  };

  useEffect(() => {
    const fetchWeightEntries = async () => {
      try {
        const storedData = await AsyncStorage.getItem('weightEntries');
        if (storedData) {
          const entries = JSON.parse(storedData);

          const weights = entries.map((entry: any) => parseFloat(entry.weight));
          const labels = entries.map((e: any) => {
            const dateLabels = moment(e?.date).format('DD/MM');
            return dateLabels;
          });
          setLabelsData(labels);
          setWeightData(weights);
        }
      } catch (error) {
        console.error('Error fetching weight entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeightEntries();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
