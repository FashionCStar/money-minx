import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import FacebookLogin from 'react-facebook-login';
import { useHistory, Link, useLocation } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';

import env from 'app/app.env';
import { AuthLayout } from 'layouts/auth.layout';
import { useModal } from 'common/components/modal';
import { useAuthDispatch } from 'auth/auth.context';
import {
  getCurrentSubscription,
  postFacebookLogin,
  getAccount,
  getSubscription
} from 'api/request.api';
import { appRouteConstants } from 'app/app-route.constant';
import { login, associateFacebookUser } from 'auth/auth.service';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { EMAIL_IS_EMPTY, PWD_IS_EMPTY } from 'lang/en/validation.json';
import { ReactComponent as HiddenIcon } from 'assets/icons/pass-hidden.svg';
import { ReactComponent as VisibleIcon } from 'assets/icons/pass-visible.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { ReactComponent as LoginFacebookIcon } from 'assets/images/login/facebook-icon.svg';

import EmailNeededModal from './inc/email-needed.modal';
import AssociateEmailModal from './inc/associate-email.modal';
import {pricingDetailConstant} from '../../common/common.constant';

const Login = () => {
  return (
    <AuthLayout>
      <LoginMainSection />
    </AuthLayout>
  );
};

export default Login;

export const LoginMainSection = () => {
  const history = useHistory();
  const { search } = useLocation();
  const associateModal = useModal();
  const dispatch = useAuthDispatch();
  const emailNeededModal = useModal();
  const [fbToken, setFBToken] = useState<string>('');
  const [associateMessage, setAssociateMessage] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const visibilityIcon = passwordVisible ? <VisibleIcon /> : <HiddenIcon />;

  const isExpired = search.includes('?expired=true');

  const responseFacebook = async (response: any) => {
    if (response.accessToken) {
      setFBToken(response.accessToken);
      const { error } = await postFacebookLogin({
        accessToken: response.accessToken,
        mailChimpSubscription: true,
        subscriptionPriceId: 'price_1HnCFAAjc68kwXCHBj66nCW0',
      });

      if (!error) {
        history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
        toast('Successfully logged in', { type: 'success' });
      } else {
        if (error.statusCode === 400 && error.message) {
          emailNeededModal.open();
        }

        if (error.statusCode === 409 && error.message) {
          setAssociateMessage(error.message);
          associateModal.open();
        }
      }
    }
  };

  const handleFacebookAssociation = async () => {
    const { error } = await associateFacebookUser({ dispatch, token: fbToken });

    if (error) {
      toast('Association Failed', { type: 'error' });
    } else {
      history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
      toast('Association Success', { type: 'success' });
    }
    associateModal.close();
  };

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
              <div className={isExpired ? 'session-expired' : 'session-expired hide-me'}>
                <p>We thought you left, so we logged you out to protect your account.</p>
              </div>
              <div className='form-wrap'>
                <Formik
                  validateOnChange={false}
                  initialValues={{ email: '', password: '' }}
                  onSubmit={async (values, actions) => {
                    const isEmailEmpty = isEmpty(values.email);
                    const isPasswordEmpty = isEmpty(values.password);
                    const hasEmptyFields = isEmailEmpty || isPasswordEmpty;

                    if (hasEmptyFields) {
                      if (isEmailEmpty) {
                        actions.setFieldError('email', EMAIL_IS_EMPTY);
                      }
                      if (isPasswordEmpty) {
                        actions.setFieldError('password', PWD_IS_EMPTY);
                      }
                      return false;
                    }

                    const { error } = await login({ dispatch, payload: values });
                    actions.setSubmitting(false);

                    if (!error) {
                      const { data } = await getCurrentSubscription();
                      if (data?.subscriptionStatus === 'active' || data?.subscriptionStatus === 'trialing') {
                        const accounts = await getAccount();
                        const manualAccounts = accounts?.data?.filter((account: Record<string, string>) => account.isManual).length
                        const autoAccounts = accounts?.data?.filter((account: Record<string, string>) => !account.isManual).length
                        const subscriptionDetails = await getSubscription({priceId:data.priceId})
                        toast('Sign in Success', { type: 'success' });
                        if(autoAccounts >= subscriptionDetails?.data?.details[pricingDetailConstant.CONNECTED_ACCOUNT] || manualAccounts >= subscriptionDetails?.data?.details[pricingDetailConstant.MANUAL_ACCOUNT]) {
                          history.push(appRouteConstants.account.REMOVE_ACCOUNT)
                        }
                        else if (accounts?.data?.length) return history.push(appRouteConstants.networth.NET_WORTH);
                        else return history.push(appRouteConstants.auth.CONNECT_ACCOUNT);
                      } else return history.push(appRouteConstants.subscription.SUBSCRIPTION);
                    }

                    actions.setFieldError(
                      'password',
                      error?.message && typeof error.message !== 'object'
                        ? error.message
                        : 'Please enter valid credentials'
                    );
                  }}
                >
                  {(props) => {
                    const updateEmailAddress = (event: ChangeEvent<HTMLInputElement>) => {
                      dispatch({ type: 'UPDATE_EMAIL_ADDRESS', email: event.target.value });
                      return props.handleChange(event);
                    };
                    const { errors } = props;

                    const hasError = (field: 'email' | 'password') => errors[field];

                    const emailClass = hasError('email') ? 'email invalid' : 'email';
                    const passClass = hasError('password') ? 'password invalid' : 'password';

                    return (
                      <form onSubmit={props.handleSubmit}>
                        <div className='align-items-start input-wrapper'>
                          <div className='email-wrap'>
                            <input
                              type='email'
                              className={emailClass}
                              onChange={updateEmailAddress}
                              onBlur={props.handleBlur}
                              value={props.values.email}
                              name='email'
                              placeholder='Email'
                            />
                          </div>
                          {hasError('email') ? <div className='mt-2 feedback'>{props.errors.email}</div> : null}
                        </div>

                        <div className='align-items-center'>
                          <div className='password-wrap'>
                            <input
                              name='password'
                              className={passClass}
                              placeholder='Password'
                              onBlur={props.handleBlur}
                              onChange={props.handleChange}
                              value={props.values.password}
                              type={passwordVisible ? 'text' : 'password'}
                            />
                            <span
                              className='visibility-icon'
                              onClick={() => setPasswordVisible(!passwordVisible)}
                              role='button'
                            >
                              {visibilityIcon}
                            </span>
                          </div>
                          {hasError('password') ? <div className='mt-2 feedback'>{props.errors.password}</div> : null}
                        </div>

                        <p>
                          <span className='forgot-pass purple-links'>
                            <Link to={appRouteConstants.auth.FORGOT_PASSWORD}>Forgot Password?</Link>
                          </span>
                        </p>
                        <button className='mm-btn-animate mm-btn-primary' type='submit' disabled={props.isSubmitting}>
                          Log in
                        </button>
                      </form>
                    );
                  }}
                </Formik>

                <div className='facebook-login'>
                  <div className='social-login-options'>
                    <span>Or, log in with:</span>
                    <div className='fb-icon-wrap'>
                      <FacebookLogin
                        authType='rerequest'
                        textButton=''
                        fields='email'
                        isMobile={false}
                        autoLoad={false}
                        reAuthenticate={true}
                        callback={responseFacebook}
                        scope='public_profile,email'
                        icon={<LoginFacebookIcon className='social-login-fb' />}
                        appId={env.FACEBOOK_APP_ID || ''}
                        buttonStyle={{
                          background: 'transparent',
                          padding: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className='auth-end-element'>
                    {'Don’t have an account? '}
                    <Link to='/signup' className='purple-links'>
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AssociateEmailModal
        source='login'
        message={associateMessage}
        associateModal={associateModal}
        handleSuccess={handleFacebookAssociation}
      />

      <EmailNeededModal emailNeededModal={emailNeededModal} />
    </div>
  );
};
