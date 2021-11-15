import React from 'react';

import { AllocationsFilter } from 'allocation/allocation.enum';
import { AllocationSubNavigationProps } from 'allocation/allocation.type';

import AppSubHeader from 'common/app.sub-header';

export const AllocationSubNavigation: React.FC<AllocationSubNavigationProps> = ({ onTypeChange, filter }) => {
  return (
    <section className='content-container mm-allocation-sub-navigation'>
      <div className='app-subheader-container'>
        <AppSubHeader/>
        <div className='mm-plan-radios mm-allocation-radios middle-box'>
          <input
            type='radio'
            id='mm-allocation-type'
            value='type'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.TYPE}
            aria-checked={filter === AllocationsFilter.TYPE}
            onChange={() => onTypeChange(AllocationsFilter.TYPE)}
          />
          <label className='labels' htmlFor='mm-allocation-type'>
            Type
          </label>
          <input
            type='radio'
            id='mm-allocation-asset'
            value='annually'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.ASSET_CLASS}
            aria-checked={filter === AllocationsFilter.ASSET_CLASS}
            onChange={() => onTypeChange(AllocationsFilter.ASSET_CLASS)}
          />
          <label className='labels' htmlFor='mm-allocation-asset'>
            Asset Class
          </label>
          <input
            type='radio'
            id='mm-allocation-country'
            value='country'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.COUNTRY}
            aria-checked={filter === AllocationsFilter.COUNTRY}
            onChange={() => onTypeChange(AllocationsFilter.COUNTRY)}
          />
          <label className='labels' htmlFor='mm-allocation-country'>
            Country
          </label>
          <input
            type='radio'
            id='mm-allocation-risk'
            value='risk'
            name='mm-radio-time-interval'
            checked={filter === AllocationsFilter.RISK}
            aria-checked={filter === AllocationsFilter.RISK}
            onChange={() => onTypeChange(AllocationsFilter.RISK)}
          />
          <label className='labels' htmlFor='mm-allocation-risk'>
            Risk
          </label>
          <div className='mm-radio-bg' />
        </div>
        {/*<div className='right-box'>
          <button type='button' className='download-btn'>
            <DownloadExcel />
            <span className='sm-hide'>Download</span> <span>CSV</span>
          </button>
        </div>*/}
      </div>
    </section>
  );
};

export default AllocationSubNavigation;
