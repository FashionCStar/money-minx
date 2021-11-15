import React from 'react';
import { Link } from 'react-router-dom';
import { appRouteConstants } from 'app/app-route.constant';

const SignupToday = () => {
  return (
    <div className='signup-today-wrapper bg-primary text-white'>
      <div className='row align-items-center'>
        <div className='col-lg-6'>
          <div className='text-wrapper'>
            <p className='large-heading-light'>Sign up today</p>
            <p>
              Asset allocation, performance tracking, and more. Discover the effortless way to stay on top of your
              investments.
            </p>
          </div>
        </div>
        <div className='col-lg-6'>
          <div className='signup-btn-wrapper d-md-flex float-xl-right'>
            <Link to='/pricing'>
              <button className='mm-btn-animate mm-btn-primary-outline btn-xs-block mr-3 my-2'>Compare Plans</button>
            </Link>
            <Link to={appRouteConstants.auth.SIGNUP}>
              <button className='mm-btn-animate bg-white text-primary ml-3 btn-xs-block ml-3 my-2'>Sign Up Free</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupToday;
