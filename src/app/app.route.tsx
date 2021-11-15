import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Login, Signup } from 'auth';
import Setting from 'setting/setting';
import AuthRoute from 'auth/auth.route';
import NotFound from 'website/views/not-found';
import WebsiteRoute from 'website/website.route';
import AccountRoute from 'account/account.route';
import { NetworthProvider } from 'networth/networth.context';
import { Home, TermNService, Notice, Privacy, About, Pricing, Security, FeaturesNetWorth } from 'website/views';

import {
  Networth,
  TokenExpired,
  ResetPassword,
  StripeSuccess,
  StripeFailure,
  AccountSetting,
  ConnectAccount,
  Subscription,
} from './app.view';

import { appRouteConstants } from './app-route.constant';
import AllocationRoute from 'allocation/allocation.route';
import { ForgotPassword } from 'auth/views';

const {
  home,
  web: { SECURITY },
  features: { FEATURES_NET_WORTH },
  account: { ACCOUNT },
  settings: { SETTINGS },
  subscription: { SUBSCRIPTION },
  networth: { NET_WORTH },
  allocation: { ALLOCATION },
  misc: { STRIPE_FAILURE, STRIPE_SUCCESS },
  auth: { DEF, LOGIN, SIGNUP, FORGOT_PASSWORD, RESET_PASSWORD, TOKEN_EXPIRED, CONNECT_ACCOUNT, ACCOUNT_SETTING },
} = appRouteConstants;

function AppRoute() {
  return (
    <>
      <Switch>
        <Route exact path={home}>
          <Home />
        </Route>

        <Route path='/w'>
          <WebsiteRoute />
        </Route>

        <Route path={DEF}>
          <AuthRoute />
        </Route>

        <Route path={ACCOUNT}>
          <AccountRoute />
        </Route>

        <Route path={ALLOCATION}>
          <AllocationRoute />
        </Route>

        <Route exact path={'/about'} component={About} />
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={SIGNUP} component={Signup} />
        <Route exact path={'/notices'} component={Notice} />
        <Route exact path={'/privacy'} component={Privacy} />
        <Route exact path={'/pricing'} component={Pricing} />
        <Route exact path={'/terms'} component={TermNService} />
        <Route exact path={FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={SETTINGS} component={Setting} />
        <Route exact path={SUBSCRIPTION} component={Subscription} />
        <Route exact path={SECURITY} component={Security} />
        <Route exact path={FEATURES_NET_WORTH} component={FeaturesNetWorth} />
        <Route exact path={TOKEN_EXPIRED} component={TokenExpired} />
        <Route exact path={STRIPE_SUCCESS} component={StripeSuccess} />
        <Route exact path={STRIPE_FAILURE} component={StripeFailure} />
        <Route exact path={RESET_PASSWORD} component={ResetPassword} />
        <Route exact path={CONNECT_ACCOUNT} component={ConnectAccount} />
        <Route exact path={ACCOUNT_SETTING} component={AccountSetting} />
        <Route exact path={NET_WORTH}>
          <NetworthProvider>
            <Networth />
          </NetworthProvider>
        </Route>
        <Route exact path={'/404'} component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </>
  );
}

export default AppRoute;
