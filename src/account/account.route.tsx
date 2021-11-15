import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Account from './views/account';
import { NotFound } from 'website/views';
import { AccountProvider } from './account.context';

function AccountRoute() {
  return (
    <AccountProvider>
      <Switch>
        <Route exact path='/account-details/:accountId' component={Account} />
        <Route exact path='/account-detail/404' component={NotFound} />
        <Redirect to='/account/404' />
      </Switch>
    </AccountProvider>
  );
}

export default AccountRoute;
