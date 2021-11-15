import React from 'react';
import { WebsiteProps } from './website.type';
import WebsiteHeader from './inc/website.header';
import WebsiteFooter from './inc/website.footer';

const Website: React.FC<WebsiteProps> = () => {
  return (
    <>
      <WebsiteHeader />
      <WebsiteFooter />
    </>
  );
};

export default Website;
