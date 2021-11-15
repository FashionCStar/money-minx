import React from 'react';
import { ReactComponent as Chase } from '../../assets/images/account/chase.svg';
import AppSubHeader from '../../common/app.sub-header';

export const AccountSubNavigation = () => {
return (
<section>
  <div className='content-container mm-account-sub-nav'>
    <div className='app-subheader-container'>
    <AppSubHeader/>
    <div className='middle-box'>
      <Chase />
    </div>
  </div>
  </div>
</section>
);
};

export default AccountSubNavigation;
