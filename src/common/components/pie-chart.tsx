import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import useSize from 'common/hooks/useSize';
import { BreakPoint } from 'app/app.constant';
import { ChartData } from 'allocation/allocation.type';

const COLORS = [
  '#235ee7',
  '#10c273',
  '#e74f99',
  '#ffd911',
  '#1f32ad',
  '#f7b164',
  '#16977f',
  '#158fff',
  '#ffbc02',
  '#f5325c',
  '#b5d539',
  '#c73cb9',
  '#29cfd6',
  '#7854f6',
  '#ec7100',
  '#c11a1a',
  '#d3365f',
  '#b1c0d2',
  '#454d7f',
  '#14b8b8',
];

interface MMPieChartProps {
  chartData: ChartData;
  share?: boolean;
}

export const MMPieChart: React.FC<MMPieChartProps> = ({ chartData, share = false }) => {
  const data = chartData
    .map((item) => ({
      name: item.group,
      value: item.per,
    }))
    .sort((a, b) => b.value - a.value);

  let w = 440;
  let h = 440;
  let cx = 250;
  let cy = 250;
  let ir = 95;
  let outR = 155;

  const { width } = useSize();
  if (width < BreakPoint.MD || share) {
    w = 350;
    h = 350;
    cx = 180;
    cy = 150;
    ir = 70;
    outR = 100;
  }

  return (
    <div className='allocation-chart-wrapper'>
      <ResponsiveContainer width={w} height='100%'>
        <PieChart width={w} height={h} onMouseEnter={() => {}} className='mm-allocation-overview__block--chart'>
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={ir}
            outerRadius={outR}
            fill='#000000'
            stroke='none'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
