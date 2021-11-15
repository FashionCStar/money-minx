import React from 'react';

import AppFooter from 'common/app.footer';
import useScrollTop from 'common/hooks/useScrollTop';

export const AuthLayout: React.FC = ({ children }) => {
  useScrollTop();
  return (
    <div className='auth-wrapper'>
      {children}
      <AppFooter />
    </div>
  );
};
