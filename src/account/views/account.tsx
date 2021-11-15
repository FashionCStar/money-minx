import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import AppFooter from 'common/app.footer';
import AppHeader from '../../common/app.header';
import Dropdown from 'react-bootstrap/Dropdown';
import AccountSubNavigation from './account-sub-navigation';

import { ReactComponent as Info } from 'assets/icons/info.svg';
import { ReactComponent as SettingsGear } from 'assets/icons/icon-settings-gear.svg';
import { ReactComponent as Chart } from 'assets/images/account/chart.svg';
import { ReactComponent as ChartTab } from 'assets/images/account/chart-tab.svg';
import { ReactComponent as ChartMobile } from 'assets/images/account/chart-mobile.svg';
import { ReactComponent as CheckCircle } from 'assets/images/account/check-circle.svg';

import AccountTable from './account-table';
import ActivityTable from './activity-table';
import { AccountProps } from '../account.type';
import AppSidebar from '../../common/app.sidebar';

const Account: React.FC<AccountProps> = () => {

  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);

  return (
    <div className='mm-setting'>
      <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
        open={openRightNav}
      />
      <AccountSubNavigation />
      <AppSidebar openLeft={openLeftNav} openRight={openRightNav} />
      <div className='mm-account'>
        <div className='mm-account__selection mb-3'>
          <SettingsGear className='float-left mr-3 settings-gear-button' />
          <div className='mm-account__selection--info float-lg-left mr-md-3 d-md-inline-block'>
            <ul>
              <li>401K - Job 1</li>
              <li>Investment Assets</li>
              <li>401K</li>
              <li>Retirement</li>
              <li>USD</li>
            </ul>
          </div>
          <div className='d-md-flex justify-content-between mt-3'>
            <div className='d-flex'>
              <div className=''>
                <Dropdown>
                  <Dropdown.Toggle variant='outline-secondary' id='dropdown-year'>
                    Dropdown Button
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                    <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant='outline-secondary' id='dropdown-month'>
                    Dropdown Button
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                    <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                    <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className='mm-account__selection--type float-right'>
              <CheckCircle />
              <span>Manual</span>
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <Chart className='w-100 d-none d-xl-block' />
          <ChartTab className='w-100 d-none d-md-block d-xl-none' />
          <ChartMobile className='w-100 d-md-none' />
        </div>
        <div className='d-flex justify-content-between flex-wrap'>
          <div className='mm-plan-radios mb-4'>
            <input
              type='radio'
              id='mm-account-holding'
              value='holdings'
              name='mm-radio-time-interval'
              aria-checked='true'
            />
            <label className='labels' htmlFor='mm-account-holding'>
              Holdings
            </label>
            <input
              type='radio'
              id='mm-account-activity'
              value='activity'
              name='mm-radio-time-interval'
              aria-checked='false'
            />
            <label className='labels' htmlFor='mm-account-activity'>
              Activity
            </label>
            <div className='mm-radio-bg' />
          </div>
          <Button variant='primary' className='mb-4 mm-account__btn'>
            Add Position
          </Button>
        </div>
        <AccountTable />

        {/* contain for selection of Activity*/}
        <div className='mm-account-activity-block mt-5'>
          <div className='d-flex align-items-center mb-4'>
            <p className='mb-0'>
              To properly calculate performance make sure that all withdrawals and deposits are accurately tracked below
              as Cash Flow
            </p>
            <div className='ml-2'>
              <Info />
            </div>
          </div>
          <ActivityTable />
        </div>

        {/* add activity popup modal section */}
        <div className='mm-add-activity-modal mt-5'>
          <div className='row mb-4'>
            <div className='col-md-5'>
              <div className='d-md-flex align-items-baseline'>
                <p className='mr-xl-5 mb-3 mb-md-0'>
                  <span className='d-block d-md-none'>Date</span>04 / 04 / 2020
                </p>
                <Form.Control as='select' className='mr-sm-2' id='inlineFormCustomSelect' custom>
                  <option value='0'>Choose...</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Form.Control>
                <Form.Control
                  type='text'
                  placeholder='This is a deposit description'
                  className='mm-add-activity-modal__text d-none d-xl-block'
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='d-md-flex align-items-baseline justify-content-between mt-3'>
                <p className='mx-xl-5 mb-3 mb-md-0'>
                  <span className='d-block d-md-none'>Amount</span>$10
                </p>
                <p className='mx-xl-5 mb-3 mb-md-0'>
                  <span className='d-block d-md-none'>Balance</span>$231,234
                </p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='d-md-flex align-items-baseline'>
                <Form.Control as='select' className='mr-sm-2 mb-3 mb-md-0' id='inlineFormCustomSelect' custom>
                  <option value='0'>Choose...</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Form.Control>
                <Form.Control as='select' className='mr-sm-2' id='inlineFormCustomSelect' custom>
                  <option value='0'>Choose...</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Form.Control>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-5'>
              <label className='custom-checkbox'>
                <input type='checkbox' value='true' aria-checked='true' />
                <span className='checkmark mm-add-activity-modal__checkmark' />
              </label>
              <span className='mm-add-activity-modal__checkmark--label'>Ignore this transaction</span>
            </div>
            <div className='col-md-3' />
            <div className='col-md-4'>
              <Button className='mm-add-activity-modal__btn w-100 mt-4 mt-md-0' variant='primary'>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default Account;
