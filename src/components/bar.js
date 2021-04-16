// import * as React from 'react'
// import Paper from '@material-ui/core/Paper'
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from '@devexpress/dx-react-chart-material-ui'

// import { Animation } from '@devexpress/dx-react-chart'

// const BarChat = ({ data }) => {
//   return (
//     <Paper>
//       <Chart data={data}>
//         <ArgumentAxis />
//         <ValueAxis max={7} />

//         <BarSeries valueField='time' argumentField='temperature' />
//         <Title text='World population' />
//         <Animation />
//       </Chart>
//     </Paper>
//   )
// }
import React from "react";
import Chart from "react-google-charts";

 
function Barchat({data}) {
  return (
    <>
      <Chart
        width={"100%"}
        height={"380px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ["temperature", "time"],
          ...data.map((res, index) => [res.temperature, res.time]),
        ]}
        options={{
          backgroundColor: "transparent",
          legend: { position: "none" },
          tooltip: {
            trigger: "none",
          },
          bar: { gap: 0 },
          histogram: {
            hideBucketItems: true,
          },
          color:['blue']
        }}
      />
    </>
  );
}
export default Barchat;


