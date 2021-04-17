import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'

import { Animation } from '@devexpress/dx-react-chart'

const BarChart = ({ data }) => {
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={7} />

        <BarSeries valueField='temperature' argumentField='time' />
        <Animation />
      </Chart>
    </Paper>
  )
}

export default BarChart;


