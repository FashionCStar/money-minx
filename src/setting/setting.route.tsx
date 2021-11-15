import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Settings from './setting';
import { SettingsProvider } from './setting.context';

function SettingsRoute() {
  return (
    <SettingsProvider>
      <Switch>
        <Route exact path='/settings?active=Settings' component={Settings} />
        <Route exact path='/settings/404' component={NotFound} />
        <Redirect to='/settings/404' />
      </Switch>
    </SettingsProvider>
  );
}

function NotFound() {
  return <div>NOT FOUND </div>;
}

export default SettingsRoute;
