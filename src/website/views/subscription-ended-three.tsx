import React from 'react';
import { ReactComponent as SubscriptionPositiveWarning } from 'assets/images/subscription/positive-warning.svg';
import { ReactComponent as BackIcon } from 'assets/images/subscription/back-btn.svg';

import { ReactComponent as AboutWealthFrontIcon } from 'assets/images/about/wealthfront.svg';

const SubscriptionEnded = () => {
  return (
    <PricingTable />
  );
};

export default SubscriptionEnded;
export const PricingTable = () => {
  return (
    <div className='subscription-ended bottom py-5'>
      <div className='container'>
        <div className='row'>
          <div className='subs-ended-msg-box positive'>
            <div className='subs-ended-left'>
              <h4>All set!</h4>
              <p>You are good to go, hit the Finish button to get back to your dashboard.</p>
            </div>
            <span className='warning-icon'>
              <SubscriptionPositiveWarning />
            </span>
          </div>
          <div className='col-lg-12'>
            <div className='subscription-account-wrap'>
              <h3>Connected Accounts</h3>
              <ul className='subscribed-list'>
                <li>
                  <div className='account-wrap mr-0'>
                    <p>
                      <span className='logo-icon'>
                        <AboutWealthFrontIcon />
                      </span>
                    Wealthfront
                  </p>
                    <button className='delete-btn'>
                      <a href='link9'>Delete Account</a>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='action-overlay'>
        <div className='row mm-subscription-ended-three'>
        <div className='subscription-bottom-text positive'>
          <div className='subs-content one'>
            <a href='link12'>
              <span className='back-btn'>
                <BackIcon />
              </span>
            </a>
          </div>
          <div className='subs-content two'>
            <p>1/1</p>
          </div>
          <div className='subs-content three'>
            <p>You are good to go!</p>
          </div>
          <div className='subs-content four'>
            <button className='finish-btn'>
              <a href='link11'>Finish</a>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
