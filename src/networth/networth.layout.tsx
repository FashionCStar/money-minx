import React, { useState } from 'react';

import AppHeader from 'common/app.header';
import AppFooter from 'common/app.footer';
import AppSidebar from 'common/app.sidebar';

import 'assets/css/networth/networth.scss';

const NetworthLayout: React.FC = ({ children }) => {
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);
  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);

  return (
    <>
      <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
        open={openRightNav}
      />
      <AppSidebar openLeft={openLeftNav} openRight={openRightNav} />
      {children}
      <div className='mm-slider-bg-overlay'/>
      <AppFooter />
    </>
  );
};

export default NetworthLayout;
