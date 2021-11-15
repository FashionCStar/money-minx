import React from 'react';
import WebsiteLayout from 'website/website.layout';
import { ReactComponent as NotFoundImage } from 'assets/images/notfound.svg';

const NotFound = () => {
  return (
    <WebsiteLayout>
      <div className='not-found-content-wrapper w-100'>
        <div className='not-found-svg-wrapper d-flex flex-column align-items-baseline justify-content-center '>
          <NotFoundImage />
        </div>
        <div className='nf-text-btn-wrapper'>
          <p>Sorry page not found :) </p>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default NotFound;
