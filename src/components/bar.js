import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'

import { Animation } from '@devexpress/dx-react-chart'

let makeLabel = (symbol, color) => ({ text, style, ...restProps }) => (
  <ValueAxis.Label
    text={`${text} ${symbol}`}
    style={{
      fill: color,
      ...style,
    }}
    {...restProps}
  />
)


const BarChart = ({ data, currentTemp }) => {
  const PriceLabel = makeLabel(currentTemp)
  console.log(data)
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis max={7} labelComponent={PriceLabel} />
        {/* labelComponent={PriceLabel} */}
        <BarSeries valueField='temperature' argumentField='time' />
        {data && <Animation />}
      </Chart>
    </Paper>
  )
}

export default BarChart;


