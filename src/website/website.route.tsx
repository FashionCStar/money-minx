import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { WebsiteProvider } from './website.context';
import { websiteRouteConstant } from './website.constant';
import {
  Home,
  About,
  Notice,
  Privacy,
  Pricing,
  NotFound,
  Security,
  TermNService,
  SubscriptionEnded,
  SubscriptionEndedTwo,
  SubscriptionEndedThree,
  FeaturesNetWorth
} from './views';

const {
  DEF,
  HOME,
  TERMS,
  ABOUT,
  NOTICE,
  PRIVACY,
  PRICING,
  SECURITY,
  NOT_FOUND,
  SUBSCRIPTION_ENDED,
  SUBSCRIPTION_ENDED_TWO,
  SUBSCRIPTION_ENDED_THREE,
  FEATURES_NET_WORTH,
} = websiteRouteConstant;

function WebsiteRoute() {
  return (
    <WebsiteProvider>
      <Switch>
        <Route exact path={DEF} component={Home} />
        <Route exact path={HOME} component={Home} />
        <Route exact path={ABOUT} component={About} />
        <Route exact path={NOTICE} component={Notice} />
        <Route exact path={PRIVACY} component={Privacy} />
        <Route exact path={PRICING} component={Pricing} />
        <Route exact path={SECURITY} component={Security} />
        <Route exact path={TERMS} component={TermNService} />
        <Route exact path={NOT_FOUND} component={NotFound} />
        <Route exact path={SUBSCRIPTION_ENDED} component={SubscriptionEnded} />
        <Route exact path={SUBSCRIPTION_ENDED_TWO} component={SubscriptionEndedTwo} />
        <Route exact path={SUBSCRIPTION_ENDED_THREE} component={SubscriptionEndedThree} />
        <Route exact path={FEATURES_NET_WORTH} component={FeaturesNetWorth} />
        <Redirect to={NOT_FOUND} />
      </Switch>
    </WebsiteProvider>
  );
}

export default WebsiteRoute;
