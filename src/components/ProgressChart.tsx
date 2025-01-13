import React, {FC, useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {useWeightStore} from '../store';
import Svg, {Line, Text} from 'react-native-svg';

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

  const targetWeight = 60;

  const chartHeight = 256;

  const data = {
    labels: labelsData.length > 0 ? labelsData.slice(-5) : defaultLabels,
    datasets: [
      {
        data: weightData.length > 0 ? weightData.slice(-5) : defaultWeights,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Weight Progress'],
  };

  // const tragetLine = useCallback(() => {
  //   if (weightData.length === 0) return null;

  //   const maxWeight = Math.max(...weightData);
  //   const minWeight = Math.min(...weightData);

  //   const yPosition =
  //     chartHeight -
  //     ((targetWeight - minWeight) / (maxWeight - minWeight)) *
  //       (chartHeight - 16);

  //   console.log(yPosition);
  //   return (
  //     <Svg>
  //       <Line
  //         x1={'65'}
  //         x2={screenWidth - 30}
  //         y1={yPosition}
  //         y2={yPosition}
  //         stroke="black"
  //         strokeWidth="1"
  //         strokeDasharray="4 4"
  //       />

  //       <Text
  //         x={screenWidth - 120}
  //         y={yPosition - 5}
  //         fill="black"
  //         fontSize="12"
  //         fontWeight="bold">
  //         Target: {targetWeight} kg
  //       </Text>
  //     </Svg>
  //   );
  // }, [weightData]);

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={256}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        formatYLabel={c => {
          const decimal = Math.floor(Number(c));
          return String(decimal);
        }}
        bezier
        // decorator={tragetLine}
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
  color: () => `rgba(0, 0, 0, 1)`,
  labelColor: () => `rgba(0, 0, 0, 1)`,
  strokeWidth: 1,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: 'rgba(0, 0, 0, 0.1)',
  },
  propsForVerticalLabels: {
    strokeWidth: 0,
  },
  propsForHorizontalLabels: {
    strokeWidth: 0.3,
    border: 'translucent-scale',
    fontSize: 14,
  },

  /* Adjusts the fill of the chart */
  fillShadowGradient: 'transparent',
  fillShadowGradientOpacity: 0,
  fillShadowGradientFromOffset: 0,
  fillShadowGradientTo: 'transparent',
  fillShadowGradientToOpacity: 0,
};
