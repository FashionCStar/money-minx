import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { Account } from 'auth/auth.types';
import { getAccount } from 'api/request.api';
import { getRelativeDate } from './moment.helper';
import { fNumber, numberWithCommas } from './number.helper';

const AppSubHeader = () => {
  const [currentAccount, setCurrentAccount] = useState<Account[]>();
  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccount();
      if (!error) {
        setCurrentAccount(data);
      }
    };
    fetchCurrentAccount();
  }, []);
  return (
    <div className='left-box'>
      <Link to='/connect-account' className='plus-btn'>+</Link>
      <div className='myaccount-drop'>
        <Dropdown className='drop-box' >
          <Dropdown.Toggle className='dropdown-toggle'>My Accounts</Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu'>
            <div className='dropdown-head'>
              <h4>Accounts</h4>
            </div>
            <div className='dropdown-box'>
              <ul className='success'>
                {currentAccount?.map((account, index) => {
                  return (
                    <li key={index}>
                      <Link to='#'>
                        <div>
                          <h5>{account.accountName}</h5>
                          <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                        </div>
                        <div>${numberWithCommas(fNumber(account.balance, 2))}</div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default AppSubHeader;
