import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

import appEnv from 'app/app.env';
import { postSubscriptionCheckout } from 'api/request.api';
import useGetSubscription from 'auth/hooks/useGetSubscription';
import { pricingDetailConstant } from 'common/common.constant';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as PricingTickIcon } from 'assets/images/pricing/tick-icon.svg';

const stripePromise = loadStripe(appEnv.STRIPE_PUBLIC_KEY);

export const PlanOverview = () => {
  const [type, setType] = useState<string>('month');

  const { fetchingSubscription, subError, subscription } = useGetSubscription();
  const { fetchingCurrentSubscription, currentSubError, currentSubscription } = useCurrentSubscription();

  const loading = fetchingCurrentSubscription || fetchingSubscription || !subscription || subError || currentSubError;

  useEffect(() => {
    if (currentSubscription && subscription) {
      const currentType = subscription.find((sub: any) => sub.priceId === currentSubscription.priceId)?.duration;
      if (currentType) {
        setType(currentType);
      }
    }
  }, [currentSubscription, subscription]);

  if (loading) {
    return <CircularSpinner />;
  }

  const isCurrentPlan = (priceId: string) => currentSubscription.priceId === priceId;
  const ac = (priceId: string) => (isCurrentPlan(priceId) ? 'mm-plan-overview__plan-btn--current' : '');

  const changePlan = async (priceId: string) => {
    if (!priceId) {
      return toast('Price Id not found', { type: 'error' });
    }

    const stripe = await stripePromise;

    const payload = {
      subscriptionPriceId: priceId,
    };

    const { data, error } = await postSubscriptionCheckout(payload);
    if (error) {
      return toast('Can not stripe checkout id', { type: 'error' });
    }

    const checkoutId = data?.checkoutId;
    if (checkoutId && stripe) {
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutId,
      });

      if (result.error) {
        return toast('Something went wrong with Stripe', { type: 'error' });
      }
    }
  };

  const monthlyPricingList = subscription?.filter((sub: any) => sub.duration === 'month' && sub.active === true);
  const annualPricingList = subscription?.filter((sub: any) => sub.duration === 'year' && sub.active === true);

  const planBtnClasses = 'mm-btn-animate trial-btn ml-3 btn-xs-block';

  const pricingList = type === 'month' ? monthlyPricingList : annualPricingList;

  return (
    <section className='mm-plan-overview my-4'>
      <div className='row mm-plan-overview__switch text-center pt-4 pb-4'>
        <div className='mm-plan-radios m-auto'>
          <input type='radio' id='mm-plan-month' value='monthly' name='mm-radio-time-interval' checked={type==='month'} />
          <label className='labels' htmlFor='mm-plan-month' onClick={() => setType('month')}>Monthly</label>
          <input type='radio' id='mm-plan-year' value='annually'  name='mm-radio-time-interval' checked={type==='yearly'} />
          <label className='labels' htmlFor='mm-plan-year' onClick={() => setType('yearly')}>Annually</label>
          <span className='save-text' />
          <div className='mm-radio-bg'/>
          </div>
      </div>

      <div className='container-fluid'>
      <div className='row'>
        <div className='plan-table-wrapper'>
        {pricingList?.map((pt: any, index: number) => {
          return (
              <div className='price-table' key={index}>
              <div className='price-heading'>
                <h2>{pt.name}</h2>
                  <p>
                    {type === 'yearly' ? `$${pt.price}/Year` : `$${pt.price}/Month`}
                    {type === 'yearly' ? <span className='save-percentage'>Save ${pt.save}</span> : null}
                  </p>
              </div>
                <ul className='features-list'>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    {pt.details[pricingDetailConstant.CONNECTED_ACCOUNT]} connected accounts
                  </li>

                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    {pt.details[pricingDetailConstant.MANUAL_ACCOUNT]} manual accounts
                  </li>

                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    {'Current and '}
                    {pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY] === 'Unlimited'
                      ? 'historical '
                      : `last ${pt.details[pricingDetailConstant.ALLOCATION_CHART_HISTORY]} months `}
                    asset allocation charts
                  </li>

                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    Early Adopter badge
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    {pt.details[pricingDetailConstant.NAME]} badge
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    New features as being developed
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    Early adopter access to founders
                  </li>
                  <li>
                    <div className='tick-icon'>
                      <PricingTickIcon />
                    </div>
                    Early adopter access to request new features for consideration
                  </li>
                </ul>
                  <div className='mm-plan-overview__card-footer'>
                    <button
                      type='button'
                      className={`${planBtnClasses} ${ac(pt.priceId)}`}
                      onClick={() => changePlan(pt.priceId)}>
                      {isCurrentPlan(pt.priceId) ? 'Current Plan' : 'Change Plan'}
                    </button>
                  </div>
            </div>
          );
        })}
      </div>
      </div>
      </div>
    </section>
  );
};

export default PlanOverview;
