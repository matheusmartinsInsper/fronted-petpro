// components/ComposedChartWithAxisLabels.js
import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Text } from '@chakra-ui/react';

const ComposedChartWithAxisLabels = ({ data }:any) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <XAxis dataKey="day" label={{ value: 'Dia', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Valor / Atendimentos', angle: -90, position: 'insideLeft', offset: 0 }} />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
        <Line type="monotone" dataKey="atendimentos" stroke="#82ca9d" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedChartWithAxisLabels;
