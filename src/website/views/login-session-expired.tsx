import React from 'react';
import WebsiteLayout from 'website/website.layout';

import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginVisibilityIcon } from 'assets/images/login/visibility-icon.svg';
import { ReactComponent as LoginFacebookIcon } from 'assets/images/login/facebook-icon.svg';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { Link } from 'react-router-dom';

const LoginSessionExpired = () => {
  return (
    <WebsiteLayout>
      <LoginSessionExpiredMainSection />
      <SecondFooterSection />
    </WebsiteLayout>
  );
};
export default LoginSessionExpired;
export const LoginSessionExpiredMainSection = () => {
  return (
    <div className='main-table-wrapper'>
      <div className='mm-container mm-container-final'>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            <div className='logo-img-wrap'>
              <LogoImg />
            </div>
            <h1>Three easy steps to get started with Money Minx</h1>
            <ul>
              <li>Find your accounts</li>
              <li>Connect it securily to Money Minx</li>
              <li>Let Money Minx to the rest</li>
            </ul>
            <div className='guide-bottom'>
              <h4>Serious about security</h4>
              <div className='guide-icon-wrap'>
                <span className='locked-icon'>
                  <LoginLockIcon />
                </span>
                <p>The security of your information is our top priority</p>
              </div>
              <h4>Trusted by investors</h4>
              <div className='guide-icon-wrap'>
                <span className='shield-icon'>
                  <LoginShieldIcon />
                </span>
                <p>Investors from all over the world are using Money Minx</p>
              </div>
            </div>
          </div>

          <div className='bg-white credentials-wrapper'>
            <div className='credentials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <h2>Welcome back</h2>
              <p>Your accounts are ready for you. Hope you will reach your goals</p>
              <div className='session-expired'>
                <p>We thought you left, so we logged you out to protect your account.</p>
              </div>
              <div className='form-wrap'>
                <form>
                  <input type='text' id='email' name='email' value='' placeholder='Email' />

                  <input type='Password' id='password' name='password' value='' placeholder='Password' />
                  <span className='visibility-icon'>
                    <LoginVisibilityIcon />
                  </span>
                </form>
                <p>
                  <span className='forgot-pass purple-links'>
                    <a href='link7'>Forgot Password?</a>
                  </span>
                </p>
                <button className='bg-primary mm-btn-primary-outline'>Log in</button>
                <div className='facebook-login'>
                  <p>
                    Or, log in with:
                    <div className='fb-icon-wrap'>
                      <a href='link6'>
                        <LoginFacebookIcon className='social-login-fb'/>
                      </a>
                    </div>
                  </p>
                </div>
                <p>
                  Don’t have an account? <a href='moneyminx' className='purple-links'>Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecondFooterSection = () => {
  return (
    <div className='container-fluid mm-container-final footer-second'>
      <div className='row'>
        <div className='footer-table-wrapper'>
          <div className='footer-content'>
            <div className='copyright-text'>© 2020 Money Minx. All rights reserved.</div>
          </div>
          <div className='footer-content right-content'>
            <ul className='footer-list'>
              <li>
                <a href='link2'>Privacy Policy</a>
              </li>
              <li>
                <a href='link3'>Terms of Service</a>
              </li>
              <li>
                <a href='link4'>Notices</a>
              </li>
              <li>
                <a href='link5'>Resources</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
