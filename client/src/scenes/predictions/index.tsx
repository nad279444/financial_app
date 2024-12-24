import DashboardBox from '@/reusable-components/dashboard-box'
import FlexBetween from '@/reusable-components/flex-between'

import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import {useMemo, useState} from 'react'
import { Box,Typography,Button } from '@mui/material' 
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import regression,{ DataPoint } from "regression"
type Props = {}

const Predictions = (props: Props) => {
  const {palette} = useTheme()
  const [isPredictions,setIsPredictions] = useState(false)
  const {data: kpiData} = useGetKpisQuery()

 const formattedData = useMemo(() => {
  if (!kpiData) return []
  const monthData = kpiData[0].monthlyData
  

  const formatted:Array<DataPoint> = monthData.map(({revenue},i:number) => {
    return [i,Number(revenue.toString().replace(/^\$/, ''))]
  })
  const regressionLine = regression.linear(formatted)

  return monthData.map(({month,revenue},i:number) => {
    console.log(revenue)
    return {
      name : month,
      "Actual Revenue" : Number(revenue.toString().replace(/^\$/, '')),
      "Regression Line" : regressionLine.points[i][1],
      "Predicted Revenue" : regressionLine.predict(i + 12)[1]
    }
  })
 },[kpiData])

 


  return (
    <DashboardBox width="100%" height= "100%" p="1rem" overflow = "hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant = "h3">
              Revenue & Predictions
          </Typography>
          <Typography variant = "h6">
            charted revenue and predicted revenue based on a simple linear regression
          </Typography>
        </Box>
        <Button onClick={() => setIsPredictions(!isPredictions)}
          sx= {{
            color : palette.grey[900],
            backgroundColor:palette.grey[700],
            boxShadow : "0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)" 

          }}
          >
              show predicted revenue for next year
          </Button>

      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{
              top: 20,
              right: 75,
              left: 20,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            >
            <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>   
            <YAxis
            domain={[12000,26000]}
              orientation="right"
              tickLine={false}
              axisLine={{strokeWidth : "0"}}
              tickFormatter={(v) => `$${v}`}
              style={{ fontSize: "10px" }}>
                 <Label value="Revenue in USD" offset={-5} angle={-90} position="insideLeft" />

              </YAxis>
            <Tooltip />
            <Legend
              verticalAlign='top'
            />
            <Line
              type="monotone"
              dataKey="actual Revenue"
              stroke={palette.primary.main}
              strokeWidth={0}
              dot={{strokeWidth : 5}}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke= "#8884d8"
              dot={false}
              
            />
            {isPredictions && (
              <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke= {palette.secondary[500]}
          
              
            />
            )}
          </LineChart>
        </ResponsiveContainer>
    </DashboardBox>
  )
}

export default Predictions