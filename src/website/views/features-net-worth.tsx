import React from 'react';
import WebsiteLayout from 'website/website.layout';
import PeerStreetLogo from 'assets/images/subscription/peerstreetlogo.png';
import { ReactComponent as AboutSwitchIcon } from 'assets/images/about/switch.svg';
import { ReactComponent as AboutNetWorthChart } from 'assets/images/about/networth.svg';
import { ReactComponent as AboutWealthFrontIcon } from 'assets/images/about/wealthfront.svg';
import { Link } from 'react-router-dom';

const FeaturesNetWorth = () => {
  return (
    <WebsiteLayout>
      <div className='mm-new-container'>
        <FeaturesNetWorthTopSection />
        <FeaturesNetWorthNetWorthSection />
      </div>
    </WebsiteLayout>
  );
};
export default FeaturesNetWorth;

export const FeaturesNetWorthTopSection = () => {
  return (
    <section>
      <div className='row mm-about-top-section'>
        <div className='col-12 col-xl-7'>
          <div className=''>
            <h1>Net Worth Tracker</h1>
            <div className='p-b-10'>
              <p className='text'>
                Money Minx allows you to track all of your assets and liabilities in one place to help you track your net worth.
                We are still in Beta but already support over 25,000 institutions worldwide so you can automatically track your accounts.{' '}
              </p>
              <p className='text'>
                We are currently working on allowing you to automatically track your cryptos, precious metals like gold, currencies, real estate and more.{' '}
              </p>
              <p className='text'>
                You can also use our manual accounts feature to track anything you want by adding accounts, positions and transactions on your own..
              </p>
            </div>
            <Link to='/signup'>
              <button className='mm-btn-animate mm-btn-primary'>Get Started</button>
            </Link>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-12 col-xl-5'>
          <div className='mm-about-right-banner'>
            <div className='account-wrap bg-white top-box'>
              <h3>Connected Accounts</h3>
              <p>Go ahead, add more accounts</p>
            </div>

            <div className='account-wrap bg-white border'>
              <h4>
                <span className='logo-icon'>
                  <AboutWealthFrontIcon />
                </span>
                Wealthfront
              </h4>
              <ul className='account-list'>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />{' '}
                  </span>
                  Joint Cash Account
                </li>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />
                  </span>{' '}
                  Investment Account
                </li>
              </ul>
            </div>
            <div className='account-wrap bg-white border small-box'>
              <h4>
                <span className='logo-icon'>
                  <img alt='Peer Street' src={PeerStreetLogo} />
                </span>
                Peer Street
              </h4>
              <ul className='account-list'>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />{' '}
                  </span>
                  Individual Investor Account
                </li>
                <li>
                  <span className='switch-icon'>
                    <AboutSwitchIcon />
                  </span>{' '}
                  Self-directed IRA
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FeaturesNetWorthNetWorthSection = () => {
  return (
      <div className='row'>
        <div className='col-xl-5'>
          <div className='networth-text'>
            <p>
              <span className='highlighted-text'>A few examples</span>
            </p>
            <h2>Net Worth Charts</h2>
            <p className='text'>
              Once your accounts are added we will keep them in sync so you will always know what your current net worth is,
              You can also keep an eye on your historical net worth and see it grow with time.
            </p>
          </div>
        </div>
        <div className='col-xl-7'>
          <div className='mm-networth-chart text-center'>
            <AboutNetWorthChart className='mm-about-net-worth-chart' />
          </div>
        </div>
      </div>
  );
};
