import { Dropdown } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react';

import { Account } from 'auth/auth.types';
import { getAccount } from 'api/request.api';
import { arrGroupBy, enumerateStr } from 'common/common-helper';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { AccountCategory, TimeIntervalEnum } from 'networth/networth.enum';
import { useNetworthDispatch, useNetworthState } from 'networth/networth.context';
import { getDate, getMonthYear, getRelativeDate } from 'common/moment.helper';

import {
  setFilterAccount,
  setFilterAccountType,
  setFilterCategories,
  setFilterFromDate,
  setFilterTimeInterval,
  setFilterToDate,
} from 'networth/networth.actions';

const NetworthFilter = () => {
  const dispatch = useNetworthDispatch();
  const [currentAccount, setCurrentAccount] = useState<Account[]>();

  const { fCategories, fTypes, fAccounts, fFromDate, fToDate, fTimeInterval } = useNetworthState();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccount();

      if (!error) {
        setCurrentAccount(data);
      }
    };

    fetchCurrentAccount();
  }, []);

  const onChange = (option: string, date: any) => {
    if (option === 'start') {
      dispatch(setFilterFromDate(getDate(new Date(date))));
    } else if (option === 'end') {
      if (fFromDate !== undefined && getDate(new Date(date)) > fFromDate) {
        dispatch(setFilterToDate(getDate(new Date(date))));
      }
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterCategories(event.target.value));
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterAccount(+event.target.value));
  };

  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterAccountType(event.target.value));
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterTimeInterval(event.target.value as TimeIntervalEnum));
  };

  if (!currentAccount) {
    return <CircularSpinner />;
  }

  const currentAccountByType = arrGroupBy(currentAccount, 'category.mmAccountType');

  return (
    <div className='row'>
      <div className='col-12 dropdowns-container'>
        <div className='dflex-center mb-15'>
          <Dropdown className='drop-box'>
            <Dropdown.Toggle variant=''>All Categories</Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu'>
              <ul className='checkbox-list'>
                {enumerateStr(AccountCategory).map((cat, index) => {
                  return (
                    <li key={index}>
                      <label>
                        <input
                          name='category'
                          type='checkbox'
                          aria-describedby={cat}
                          value={cat}
                          aria-checked={fCategories?.includes(cat)}
                          checked={fCategories?.includes(cat)}
                          onChange={handleCategoryChange}
                        />
                        <span>{cat}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='drop-box tab-hide'>
            <Dropdown.Toggle variant=''>
              All Accounts
            </Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu'>
              <div className='dropdown-box'>
                <ul className='success'>
                  {currentAccount.map((account, index) => {
                    return (
                      <li key={account.id}>
                        <label>
                          <input
                            name='accBox'
                            type='checkbox'
                            aria-describedby='Investment assets'
                            value={account.id}
                            aria-checked={fAccounts.includes(account.id)}
                            checked={fAccounts.includes(account.id)}
                            onChange={handleAccountChange}
                          />
                          <span />
                        </label>
                        <div>
                          <h5>{account.accountName}</h5>
                          <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                        </div>
                        <div>${account.balance}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className='drop-box'>
            <Dropdown.Toggle variant=''>
              All Types
            </Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu'>
              <ul className='checkbox-list'>
                {Object.keys(currentAccountByType)?.map((accountName, index) => {
                  return (
                    <li key={index}>
                      <label>
                        <input
                          name='types'
                          type='checkbox'
                          aria-describedby={accountName}
                          value={accountName}
                          aria-checked={fTypes?.includes(accountName)}
                          checked={fTypes?.includes(accountName)}
                          onChange={handleAccountTypeChange}
                        />
                        <span>{accountName}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='dflex-center mb-15'>
          <ReactDatePicker
            selected={fFromDate ? new Date(fFromDate) : null}
            onChange={(date) => onChange('start', date)}
            // selectsStart
            startDate={fFromDate ? new Date(fFromDate) : null}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            minDate={new Date('1900-01-01')}
            maxDate={new Date()}
            className='m-l-3'
            // selectsRange
            customInput={
              <div className='drop-box'>
                <div className='date-box'>
                  <input type='text' className='month_year' value={getMonthYear(fFromDate)} />
                </div>
              </div>
            }
          />
          <span className='date-separator'>to</span>
          <ReactDatePicker
            selected={fToDate ? new Date(fToDate) : null}
            onChange={(date) => onChange('end', date)}
            // selectsStart
            startDate={fToDate ? new Date(fToDate) : null}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            minDate={fFromDate ? new Date(fFromDate) : null}
            maxDate={new Date()}
            className='m-l-1'
            // selectsRange
            customInput={
              <div className='drop-box'>
                <div className='date-box'>
                  <input type='text' className='month_year' value={getMonthYear(fToDate)} />
                </div>
              </div>
            }
          />
          <Dropdown className='drop-box m-l-2'>
            <Dropdown.Toggle variant=''>
              {fTimeInterval || 'Monthly'}
            </Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu dropsm'>
              <ul className='radiolist'>
                {enumerateStr(TimeIntervalEnum).map((interval, index) => {
                  return (
                    <li key={interval}>
                      <label>
                        <input
                          type='radio'
                          name='m-list'
                          aria-checked={fTimeInterval === interval}
                          value={interval}
                          checked={fTimeInterval === interval}
                          onChange={handleIntervalChange}
                        />
                        <span>{interval}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NetworthFilter;
