import React from 'react';
import {View} from 'react-native';
import {
  AreaChart,
  Grid,
  BarChart,
  LineChart,
  XAxis,
  YAxis,
} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class Chart extends React.PureComponent {
  render() {
    const data = [
      {
        value: 50,
        label: 'One',
      },
      {
        value: 10,
        label: 'Two',
      },
      {
        value: 40,
        label: 'Three',
      },
      {
        value: 95,
        label: 'Four',
      },
      {
        value: 85,
        label: 'Five',
      },
    ];

    return (
      <View style={{flexDirection: 'row', height: 200, paddingVertical: 16}}>
        <YAxis
          data={data}
          yAccessor={({index}) => index}
          scale={shape.scaleBand}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          formatLabel={(value, index) => data[index].label}
        />
        <BarChart
          style={{flex: 1, marginLeft: 8}}
          data={data}
          horizontal={true}
          yAccessor={({item}) => item.value}
          svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
          contentInset={{top: 10, bottom: 10}}
          spacing={0.2}
          gridMin={0}>
          <Grid direction={Grid.Direction.VERTICAL} />
        </BarChart>
      </View>
    );
  }
}

export default Chart;
