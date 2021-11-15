import React from 'react';
import { ReactComponent as SubscriptionWarning } from 'assets/images/subscription/warning.svg';
import { ReactComponent as OwnAccountIcon } from 'assets/images/subscription/own-account-icon.svg';
import { ReactComponent as BackIcon } from 'assets/images/subscription/back-btn.svg';

import { ReactComponent as AboutWealthFrontIcon } from 'assets/images/about/wealthfront.svg';
import PeerStreetLogo from 'assets/images/subscription/peerstreetlogo.png';
import MerrilEdgeLogo from 'assets/images/subscription/merriledgelogo.png';
import { ReactComponent as IconTrash } from 'assets/icons/icon-trash.svg';

const SubscriptionEnded = () => {
  return (
    <PricingTable />
  );
};

export default SubscriptionEnded;
export const PricingTable = () => {
  return (
    <section>
      <div className='subscription-ended bottom py-5'>
        <div className='container'>
          <div className='row'>
            <div className='subs-ended-msg-box'>
              <div className='subs-ended-left'>
                <h4>Too many connections for current plan!</h4>
                <p>
                  Your current plan only allows for 5 connections, please remove connections to continue using Money Minx.
                </p>
              </div>
              <span className='warning-icon'>
                <SubscriptionWarning />
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
                      <IconTrash className='trash-icon'/>
                    </div>
                  </li>
                  <li>
                    <div className='account-wrap mr-0'>
                      <p>
                        <span className='logo-icon'>
                          <img alt='Peer Street' src={PeerStreetLogo} />
                        </span>
                        Peer Street
                      </p>
                      <IconTrash className='trash-icon'/>
                    </div>
                  </li>
                  <li>
                    <div className='account-wrap mr-0'>
                      <p>
                        <span className='logo-icon'>
                          <img src={MerrilEdgeLogo} alt='Peer Street' />
                        </span>
                        Merill Edge IRA
                      </p>
                      <IconTrash className='trash-icon'/>
                    </div>
                  </li>
                </ul>
                <h3>Manual Accounts</h3>
                <ul className='subscribed-list'>
                  <li>
                    <div className='account-wrap mr-0'>
                      <p>
                        <span className='logo-icon'>
                          <OwnAccountIcon />
                        </span>
                        My own account
                      </p>
                      <IconTrash className='trash-icon'/>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='action-overlay'>
          <div className='subscription-bottom-text'>
            <div className='subs-content one'>
              <a href='link12'>
                <span className='back-btn'>
                  <BackIcon />
                </span>
              </a>
            </div>
            <div className='subs-content two'>
              <p>
                4/1 <span className='hidden-text'>connected </span>
                <br />
                5/4 <span className='hidden-text'>manual</span>
              </p>
            </div>
            <div className='subs-content three'>
              <p>You need to delete 3 connected accounts and 1 manual to be able to use this plan.</p>
            </div>
            <div className='subs-content four'>
              <button className='finish-btn'>
                <a href='link11'>Finish</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
