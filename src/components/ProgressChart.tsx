import React, {FC} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
import {useWeightStore} from '../store';
import Svg, {Line, Text} from 'react-native-svg';
import {chartConfig} from '../constant';

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

  const targetWeight = 50;

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
        yAxisLabel="Kg"
        bezier
        decorator={() => (
          <TragetLine
            weightData={weightData}
            chartHeight={chartHeight}
            targetWeight={targetWeight}
            screenWidth={screenWidth}
          />
        )}
      />
    </View>
  );
};

export default ProgressChart;

const TragetLine: FC<{
  weightData: any;
  chartHeight: number;
  targetWeight: number;
  screenWidth: number;
}> = ({chartHeight, screenWidth, targetWeight, weightData}) => {
  if (weightData.length === 0) return null;

  const maxWeight = Math.max(...weightData);
  const minWeight = Math.min(...weightData);

  const yPosition =
    chartHeight -
    ((targetWeight - minWeight) / (maxWeight - minWeight)) * (chartHeight - 16);

  return (
    <Svg>
      <Line
        x1={'65'}
        x2={screenWidth - 30}
        y1={yPosition}
        y2={yPosition}
        stroke="black"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      <Text
        x={screenWidth - 120}
        y={yPosition - 5}
        fill="black"
        fontSize="12"
        fontWeight="bold">
        Target: {targetWeight} kg
      </Text>
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    borderRadius: 15,
    backgroundColor: '#B2C9AD',
  },
});
