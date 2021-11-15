import React from 'react';
import { Link } from 'react-router-dom';
import footerData from '@mm/data/footer.data.json';
// TODO delete this page when confirmed that auth-footer.tsx is used properly

export const FooterSection = () => {
  return (
    <div className='container-fluid mm-container-final footer-second'>
      <div className='row'>
        <div className='footer-table-wrapper'>
          <div className='footer-content'>
            <div className='copyright-text'>{footerData.copyrightText.replace(':year', '2020')}</div>
          </div>
          <div className='footer-content right-content'>
            <ul className='footer-list'>
              <li className='my-3 my-md-0'>
                <Link to='/privacy'>Privacy Policy</Link>
              </li>
              <li className='my-3 my-md-0'>
                <Link to='/terms'>Terms of Service</Link>
              </li>
              <li className='my-1 my-md-0'>
                <Link to='/notices'>Notices</Link>
              </li>
              <li className='my-1 my-md-0'>
                <Link to='/security'>Security</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
