import queryString from 'query-string';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useModal } from 'common/components/modal';
import PlanChangedModal from 'setting/inc/plan-changed.modal';
import SubscriptionModal from 'setting/inc/subscription.modal';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import {getAccountsCount, getSubscription} from '../../api/request.api';
import {pricingDetailConstant} from '../../common/common.constant';
import {appRouteConstants} from '../../app/app-route.constant';

const StripeCheckoutSuccess = () => {
  const location = useLocation();
  const history = useHistory();
  const isTrial = queryString.parse(location.search).trial === 'true';

  const subscriptionModal = useModal();
  const planChangedModal = useModal();

  const { fetchingCurrentSubscription, currentSubError, currentSubscription } = useCurrentSubscription();

  if (currentSubError) {
    toast('Error on getting current subscription', { type: 'error' });
  }

  useEffect(() => {
    if (isTrial) {
      return subscriptionModal.open();
    }

    return planChangedModal.open();
  }, [isTrial, subscriptionModal, planChangedModal]);

  if (fetchingCurrentSubscription) {
    return <CircularSpinner />;
  }

  const redirectToNetworth = async () => {
    const { priceId } = currentSubscription
    const { data: { connectedAccounts, manualAccounts }} = await getAccountsCount();
    const { data: { details }} = await getSubscription({priceId})
    if(connectedAccounts >= details[pricingDetailConstant.CONNECTED_ACCOUNT] || manualAccounts >= details[pricingDetailConstant.MANUAL_ACCOUNT]) {
      history.push(appRouteConstants.account.REMOVE_ACCOUNT)
    }
    else history.push(appRouteConstants.networth.NET_WORTH);
  };

  return (
    <>
      <SubscriptionModal subscriptionModal={subscriptionModal} onSuccess={redirectToNetworth} />
      <PlanChangedModal planChangedModal={planChangedModal} onSuccess={redirectToNetworth} />
    </>
  );
};

export default StripeCheckoutSuccess;
