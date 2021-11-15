import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { fNumber } from 'common/number.helper';
import { useModal } from 'common/components/modal';
import { getStringDate } from 'common/moment.helper';
import { MMPieChart } from 'common/components/pie-chart';
import SettingModal from 'allocation/modal/setting-modal';
import useAllocation from 'allocation/hooks/useAllocation';
import ChartShareModal from 'allocation/modal/chart-share-modal';
import { SelectedAllocationProps } from 'allocation/allocation.type';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as Share } from 'assets/images/allocation/share.svg';
import { ReactComponent as Calendar } from 'assets/images/allocation/calendar.svg';
import { ReactComponent as SettingsIcon } from 'assets/images/allocation/settings.svg';

import AllocationLegend from './allocation-legend';

export const SelectedAllocations: React.FC<SelectedAllocationProps> = ({ filter }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [hidden, setHidden] = useState<string[]>(['']);
  const { allocations, allocationChartData: chartData } = useAllocation(filter, date?.toISOString());

  const chartSettingModal = useModal();
  const chartShareModal = useModal();

  if (!allocations || !chartData) {
    return <CircularSpinner />;
  }

  const toggleAllocation = (key: string) => {
    if (hidden.includes(key)) {
      const tempArr = hidden.filter((item) => item !== key);

      return setHidden(tempArr);
    }

    return setHidden([...hidden, key]);
  };

  const isHidden = (key: string) => hidden.includes(key);

  const getTotal = (key: string) => {
    return chartData.find((datum) => datum.group === key);
  };

  return (
    <div className='mm-allocation-overview__block'>
      <div className='allocation-card-top'>
        <div className='mm-allocation-overview__block--date'>
          {getStringDate(date || undefined)}
          <span className='float-right'>
            <ReactDatePicker
              selected={date}
              customInput={<Calendar />}
              dateFormat='MM/yyyy'
              showMonthYearPicker
              onChange={(val: Date) => {
                setDate(val);
              }}
            />
          </span>
        </div>
        <div className='mm-allocation-overview__block--title'>Previous allocations</div>
        <p className='mm-allocation-overview__block--subtitle'>Use the arrows above to see your previous allocations</p>
        <div className='mm-allocation-overview__block--action'>
          <SettingsIcon className='mr-3' onClick={() => chartSettingModal.open()} />
          <Share onClick={() => chartShareModal.open()} />
        </div>
      </div>
      <div className='allocation-content'>
        <div
          className='text-center text-md-left d-xl-block d-md-flex align-items-md-center justify-content-md-center allocation-page-chart-wrapper'
          id='selected-allocation-pie-chart'
        >
          <MMPieChart chartData={chartData} />
          <AllocationLegend chartData={chartData} />
        </div>
        <div className='mm-allocation-overview__table'>
          <table>
            <thead>
              <tr>
                <th className='mm-allocation-overview__table--head'>Position</th>
                <th className='mm-allocation-overview__table--head'>Allocation</th>
                <th className='mm-allocation-overview__table--head'>Value</th>
              </tr>
            </thead>
            {Object.keys(allocations).map((allocationKey, index) => {
              const allocation = allocations[allocationKey];

              return (
                <React.Fragment key={index}>
                  <tbody>
                    <tr>
                      <td className='mm-allocation-overview__table--title'>
                        <span
                          className={isHidden(allocationKey) ? 'mm-allocation-overview__table--title-collapse' : ''}
                          onClick={() => toggleAllocation(allocationKey)}
                          role='button'
                        />
                        <span role='button'>{allocationKey}</span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody className={isHidden(allocationKey) ? 'hide-me' : ''}>
                    {allocation?.map((al) => {
                      return (
                        <React.Fragment key={al.id}>
                          <tr className='mm-allocation-overview__table--data-row-mobile'>
                            <span className='mt-2 mb-0'>{al.description}</span>
                          </tr>
                          <tr className='mm-allocation-overview__table--data-row'>
                            <td>{al.description}</td>
                            <td>
                              <span className='d-block'>Allocation</span>
                              {fNumber(al.per, 2)}%
                            </td>
                            <td>
                              <span className='d-block'>Value</span>${fNumber(al.value, 2)}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                  <tbody>
                    <tr className='mm-allocation-overview__table--footer'>
                      <td>Total</td>
                      <td>{fNumber(getTotal(allocationKey)?.per || 0, 2)}%</td>
                      <td>${fNumber(getTotal(allocationKey)?.total || 0, 2)}</td>
                    </tr>
                  </tbody>
                </React.Fragment>
              );
            })}
          </table>
        </div>
      </div>
      <SettingModal settingModal={chartSettingModal} />
      <ChartShareModal
        chartShareModal={chartShareModal}
        chartComponent={<MMPieChart chartData={chartData} share />}
        chartLegendComponent={<AllocationLegend chartData={chartData} sharing />}
      />
    </div>
  );
};
