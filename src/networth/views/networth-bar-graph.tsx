import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Area, ReferenceArea } from 'recharts';

import { NetworthBarGraphProps } from 'networth/networth.type';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { fNumber, numberWithCommas } from 'common/number.helper';

const CustomTooltip = (props: any) => {
  const { active, payload } = props;
  if (active) {
    let networth = undefined;
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].name === 'networth') {
        networth = payload[i];
        payload.splice(i, 1);
      }
    }
    if (networth) {
      payload.push(networth);
    }
    return (
      <div className='bar-tooltip'>
        { payload.map((item: any, index: number) => (
          <div key={index}>
            {item.value ?
              (
                <>
                  <div className='item-name'>
                    <div style={{ backgroundColor: item.color }}></div>
                    {item.name === 'investmentAssets' &&
                      <span>Investment Assets</span>
                    }
                    {item.name === 'otherAssets' &&
                      <span>Other Assets</span>
                    }
                    {item.name === 'liabilities' &&
                      <span>Liabilities Assets</span>
                    }
                    {item.name === 'networth' &&
                      <span>Net Worth</span>
                    }
                  </div>
                  <div className='item-value'>
                    {`$${numberWithCommas(fNumber(item.value, 0))}`}
                  </div>
                </>
              ) : null
            }
          </div>
        ))}

      </div>
    );
  }

  return null;
};

const renderCustomRALabel = (props: any) => {
  const { x, y } = props.viewBox;
  return <text style={{
    fontFamily: 'Mulish',
    lineHeight: '150%',
    fontSize: '11px',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: '0.2em',
    textTransform: 'uppercase'
  }} x={x + 15} y={y + 25} fill='#534CEA' fillOpacity='0.4'>projected</text>;
};

const formatter = (value: number) => {
  if (value < 1000000) {
    return `$${value / 1000}k`;
  } else {
    return `$${value / 1000000}m`;
  }
}
const getInterval = (max: number) => {
  let _interval = max / 4;
  let _l = Number(_interval.toString().split('.')[0].length) - 1;
  let _maxFloor = Math.ceil(_interval / (Math.pow(10, _l)));
  return _maxFloor * Math.pow(10, _l);
}
const NetworthBarGraph: React.FC<NetworthBarGraphProps> = (props) => {
  const { networth, fCategories } = props;
  if (!networth.length) {
    return <CircularSpinner />;
  }
  let max = 0;
  for (let i = 0; i < networth.length; i++) {
    let values = Object.values(networth[i]);
    for (let j = 1; j < values.length - 1; j++) {
      if (values[j] > max) {
        max = values[j];
      }
    }
  }
  let first_projection = undefined;
  for (let i = 0; i < networth.length; i++) {
    if (networth[i].type === 'projection') {
      first_projection = networth[i].interval;
      break;
    }
  }
  let _interval = getInterval(max);
  if (max > _interval * 3.5) {
    _interval = getInterval(max + _interval / 2);
  }
  return (
    <div className='responsive-container'>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          width={800}
          height={354}
          data={networth}
          barGap={2}
          barCategoryGap={20}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.5} />
              <stop offset='95%' stopColor='#FFFFFF' stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id='colorPr' x1='0' y1='1' x2='1' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.3} />
              <stop offset='95%' stopColor='#FFFFFF' stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke='#969eac1a' vertical={false} />
          <XAxis dataKey='interval' tickSize={0} tickMargin={10} tick={{ fontSize: 14 }} stroke='#969eac' axisLine={{ stroke: 'transparent' }} />
          <YAxis
            orientation='right'
            minTickGap={10}
            axisLine={false}
            tickSize={0}
            tickMargin={10}
            tick={{ fontSize: 14 }}
            interval="preserveStartEnd"
            stroke='#969eac'
            tickFormatter={(tick) => formatter(tick)}
            domain={[0, _interval * 4]}
          />
          <ReferenceArea
            x1={first_projection}
            y1={0}
            label={renderCustomRALabel}
            fill='url(#colorPr)'
          />
          <Tooltip
            separator=''
            cursor={false}
            content={<CustomTooltip />}
          />
          {
            fCategories && (fCategories.length === 1 || fCategories.length === 2) ? null : <Area dataKey='networth' type='monotone' stroke='#534cea' strokeOpacity='0' fill='url(#colorUv)' />
          }
          <Bar dataKey='investmentAssets' barSize={10} fill='#235EE7' radius={[2, 2, 0, 0]} />
          <Bar dataKey='otherAssets' barSize={10} fill='#29CFD6' radius={[2, 2, 0, 0]} />
          <Bar dataKey='liabilities' barSize={10} fill='#D3365F' radius={[2, 2, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetworthBarGraph;