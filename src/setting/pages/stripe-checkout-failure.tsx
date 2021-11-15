import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import React from 'react';
import { toast } from 'react-toastify';

const StripeCheckoutSuccess = () => {
  const { fetchingCurrentSubscription, currentSubError } = useCurrentSubscription();
  if (currentSubError) {
    toast('Error on getting current subscription', { type: 'error' });
  }
  if (fetchingCurrentSubscription) {
    return <CircularSpinner />;
  }

  return <div>Failure</div>;
};

export default StripeCheckoutSuccess;
