import React from 'react';

import WebsiteLayout from 'website/website.layout';
import { ReactComponent as PricingPieChart } from 'assets/images/pricing/pricing-pie-chart.svg';
import { ReactComponent as PricingPieChartMobile } from 'assets/images/pricing/pricing-pie-chart-mobile.svg';
import SubscriptionPlans from 'subscription/subscription.plans';

const Pricing = () => {
  return (
    <WebsiteLayout isSignupToday={false}>
      <PricingTopSection />
      <SubscriptionPlans />
    </WebsiteLayout>
  );
};
export default Pricing;
export const PricingTopSection = () => {
  return (
    <div className='mm-container-right pricing-banner-container'>
      <div className='row pricing-top'>
        <div className='col-lg-5'>
          <div className='pricing-left-banner'>
            <h1>
              <span className='block'>Get started with a free trial!</span>
            </h1>
            <p className='text'>
              No credit card needed, sign up now and use Money Minx free for 14 days.
            </p>

            <button className='mm-btn-animate mm-btn-primary'>Get Started</button>
            <p className='info-text'>No credit card needed.</p>
          </div>
        </div>
        <div className='col-lg-7 pricing-chart-wrapper'>
          <div className='banner-piechart mm-banner-chart'>
            <PricingPieChart className='mm-show-md' />
            <PricingPieChartMobile className='mm-show-sm' />
          </div>
        </div>
      </div>
    </div>
  );
};
