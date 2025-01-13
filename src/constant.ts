export const COLOR = {
  primary: '#66785F',
};

export const chartConfig = {
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
  },

  /* Adjusts the fill of the chart */
  fillShadowGradient: 'transparent',
  fillShadowGradientOpacity: 0,
  fillShadowGradientFromOffset: 0,
  fillShadowGradientTo: 'transparent',
  fillShadowGradientToOpacity: 0,
};
