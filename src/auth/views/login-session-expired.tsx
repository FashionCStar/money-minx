import React from 'react';
import { Link } from 'react-router-dom';

import { AuthLayout } from 'layouts/auth.layout';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginFacebookIcon } from 'assets/images/login/facebook-icon.svg';
import { ReactComponent as LoginVisibilityIcon } from 'assets/images/login/visibility-icon.svg';

const LoginSessionExpired = () => {
  return (
    <AuthLayout>
      <LoginSessionExpiredMainSection />
    </AuthLayout>
  );
};

export default LoginSessionExpired;

export const LoginSessionExpiredMainSection = () => {
  return (
    <div className='main-table-wrapper'>
      <div className=''>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            <Link to='/'>
              <LogoImg className='icon auth-logo' />
            </Link>

            <div className='auth-left-content'>
              <h1>Three easy steps to get started with Money Minx</h1>
              <ul>
                <li>Find your accounts</li>
                <li>Connect it securely to Money Minx</li>
                <li>Let Money Minx do the rest</li>
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
          </div>

          <div className='bg-white credentials-wrapper'>
            <div className='credentials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg className='auth-logo' />
              </div>
              <h2>Welcome back</h2>
              <p>Your accounts are ready for you. Hope you will reach your goals</p>
              <div className='session-expired'>
                <p>We thought you left, so we logged you out to protect your account.</p>
              </div>
              <div className='form-wrap'>
                <form>
                  <input type='text' className='email' name='email' value='' placeholder='Email' />

                  <div className='password-wrap'>
                    <input type='Password' className='password' name='password' value='' placeholder='Password' />
                    <span className='visibility-icon'>
                      <LoginVisibilityIcon />
                    </span>
                  </div>
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
                        <LoginFacebookIcon />
                      </a>
                    </div>
                  </p>
                </div>
                <p>
                  Don’t have an account?{' '}
                  <Link to='/signup' className='purple-links'>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
