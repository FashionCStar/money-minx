import React from 'react';
import WebsiteLayout from 'website/website.layout';
import { ReactComponent as SecurityChart } from 'assets/images/security/chart.svg';
import { ReactComponent as SecurityLockIcon } from 'assets/images/security/lock.svg';
import { ReactComponent as SecurityShieldIcon } from 'assets/images/security/shield.svg';
import { ReactComponent as SecurityPieChart } from 'assets/images/security/pie-chart.svg';
import { ReactComponent as SecurityTickIcon } from 'assets/images/security/tick-icon.svg';
import { ReactComponent as SecurityPartnerChart } from 'assets/images/security/partner-chart.svg';
import { ReactComponent as SecurityYodleeLogo } from 'assets/images/security/yodlee-logo.svg';
const Security = () => {
  return (
    <WebsiteLayout>
      <SecurityTopSection />
      <SecurityHeroSection />
      <SecurityPracticeSection />
      <SecurityPartneredSection />
      <SecurityInvestmentSection />
    </WebsiteLayout>
  );
};

export default Security;
export const SecurityTopSection = () => {
  return (
    <div className='mm-container-right security-container mm-security-margin'>
      <div className='row security-top'>
        <div className='col-lg-6'>
          <div className='security-left-banner mm-security-custom-banner'>
            <h1 className='large-heading-light'>
              Security and Privacy are Always Top Priority
            </h1>
            <p className='text'>
              We know your finances are personal, private and confidential. That is why, at Money Minx the security of
              your account is a top priority and the privacy of the information you share with us is always kept
              secured.
            </p>
            <p className='text'>We never sell your data.</p>
            <p className='text'>
              We charge a subscription to use our service which is how we make money. We don’t make money by selling
              data. We sometimes have to share your data with third parties to help us deliver our services and we make
              sure they don’t sell your data either.
            </p>
          </div>
        </div>
        <div className='col-lg-6 text-right security-chart-wrapper'>
          <SecurityChart className='mm-security-chart-img' />
        </div>
      </div>
    </div>
  );
};
export const SecurityHeroSection = () => {
  return (
    <div className='website-hero-wrapper'>
      <div className='security-pie-wrapper'>
        <SecurityPieChart />
      </div>
      <div className='row'>
        <p className='large-heading-light p-l-3 p-r-3'>Your Data is Protected</p>
        <div className='text-wrap p-l-3 p-r-3'>
          <p>Your sensitive information is always protected, always secure.</p>
        </div>
        <div className='col-lg-6'>
          <div className='protected-div'>
            <span className='block mb-25'>
              <SecurityShieldIcon />
            </span>
            <p className='text p-t-5'>
              We use the highest security standard and encryption with your data to make sure it is always safe.
            </p>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='protected-div'>
            <span className='block mb-25'>
              <SecurityLockIcon />
            </span>
            <p className='text p-t-5'>
              Money Minx follows strict internal controls. Employees have no access to your credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecurityPracticeSection = () => {
  return (
    <div className='minimized-gap'>
      <div className='mm-container-right SecurityPractice'>
        <div className='row security-top'>
          <div className='col-lg-6'>
            <h2 className='large-heading-light'>Secure. Private. Trusted.</h2>
            <p className='text text-gap'>
              Our website’s encryption is of the utmost importance. We stay on top of security vulnerabilities and keep
              up-to-date with best practices, including the followingractices, including the following:
            </p>
          </div>
          <div className='col-lg-6'>
            <ul className='security-list'>
              <li>
                <div className='tick-icon'>
                  <SecurityTickIcon />
                </div>
                <p className='text'>
                  Our servers require clients use the most secure TLS v1.2 protocol; older TLS and SSL insecure versions
                  are not allowed.
                </p>
              </li>
              <li>
                <div className='tick-icon'>
                  <SecurityTickIcon />
                </div>
                <p className='text'>
                  We utilize a highly trusted Extended Validation certificate, Certificate Transparency, OCSP stapling
                  and HTTP Strict Transport Security (HSTS) technology.
                </p>
              </li>
              <li>
                <div className='tick-icon'>
                  <SecurityTickIcon />
                </div>
                <p className='text'>
                  After linking your accounts to Money Minx, you can use our Transactions page to look at all
                  transactions across all accounts.{' '}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecurityPartneredSection = () => {
  return (
    <div className='website-hero-wrapper minimized-gap'>
      <div className='row'>
        <div className='col-lg-3'>
          <div className='security-partner-chart'>
            <SecurityPartnerChart />
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='partner-text'>
            <div className='security-logo'>
              <SecurityYodleeLogo />
            </div>
            <h2 className='large-heading-light'>We’ve partnered with the industry leader to keep your accounts safe.</h2>
            <p className='text'>
              We use the best of the best to aggregate your account’s data, Yodlee. Yodlee is a public company with over
              a decade of experience connecting with financial institutions, They provide an added layer of safety
              between your data and anyone who would want to access your account information. Your bank and brokerage
              credentials are only stored at Yodlee, not in Money Minx’s database.
            </p>
            <p className='text'>Your credentials are safer in Yodlee’s data center than they are in your browser!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecurityInvestmentSection = () => {
  return (
    <div className='investment-section minimized-gap'>
      <div className='mm-container-right'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='investment-wrap'>
              <h2 className='large-heading-light mb-5'>No One Can Access Your Money or Your Investments</h2>
              <p className='text'>
                Your Money Minx account only has read access to your data. Money Minx can’t trigger transfers,
                transactons or any other events with your banks, brokerages and investment sites. In the event that your
                Money Minx account is ever compromised, we’ve design our application to ensure that you are still safe.
              </p>
              <p className='text'>
                We never send your credentials to your browser, in fact we never even see your credentials. The popup
                used to link your accounts is hosted by Yodlee. When you link your accounts, your credentials are stored
                at Yodlee and are only ever sent directly to your financial institution.
              </p>
              <p className='text p-b-10'>
                For questions or concerns about security, please{' '}
                <a href='mailto:hello@moneyminx.com?subject=Money Minx Security' target='_blank' rel='noopener noreferrer'>
                  Contact us
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
