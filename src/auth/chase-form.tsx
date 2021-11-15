import React from 'react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { login } from 'auth/auth.service';
import { useAuthDispatch } from 'auth/auth.context';
import { loginValidationSchema } from 'auth/auth.validation';
import { ReactComponent as InfoIcon } from 'assets/images/signup/info.svg';

const Chaseform = () => {
  return <ChaseMortgageForm />;
};
export default Chaseform;
export const ChaseMortgageForm = () => {
  const dispatch = useAuthDispatch();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, actions) => {
        const { error } = await login({ dispatch, payload: values });
        actions.setSubmitting(false);

        if (!error) {
          toast('Sign in Success', { type: 'success' });
        } else {
          toast('Sign in Failed', { type: 'error' });
        }
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <input
            type='email'
            className='email'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.email}
            name='email'
            placeholder='Chase Mortgage'
          />
          {props.errors.email && <div className='feedback'>{props.errors.email}</div>}
          <div className='account-category'>
            <span className='form-subheading'>
              Account Category
              <a href='/link26'>
                <InfoIcon />
              </a>
            </span>
            <ul className='category-list'>
              <li>
                <a href='/link19'>Investment Asset</a>
              </li>
              <li>
                <a href='/link18'>Other Asset</a>
              </li>
              <li>
                <a href='/link20'>Liability</a>
              </li>
            </ul>
          </div>
          <div className='account-type'>
            <ul className='account-type-list'>
              <li>
                <span className='form-subheading'>Account Type</span>
                <select name='retirement' className='retirement'>
                  <option value='retirement'>Retirement</option>
                  <option value='retirement'>Retirement</option>
                </select>
              </li>
              <li>
                <div className='account-list-content'>
                  <span className='form-subheading'>Account Subtype</span>
                  <select name='401k' className='401k'>
                    <option value='401k'>401k</option>
                    <option value='401k'>401k</option>
                  </select>
                </div>
              </li>
              <li>
                <span className='form-subheading'>Currency</span>
                <select name='USD' className='USD'>
                  <option value='USD'>USD</option>
                  <option value='USD'>USD</option>
                </select>
              </li>
            </ul>
          </div>
          <div className='middle-input-wrap'>
            <div className='input-wrap performance flex-box'>
              <div className='left-input'>
                <p>
                  <span className='form-subheading'>Does your employer match your contributions?</span>
                </p>
              </div>
              <div className='right-input radio'>
                <input type='radio' />
                <label>Yes</label>
                <input type='radio' />
                <label>No</label>
              </div>
            </div>
            <div className='input-wrap flex-box'>
              <div className='left-input'>
                <p>
                  <span className='form-subheading'>Employer match</span>
                </p>
              </div>
              <div className='right-input'>
                <span className='symbol-wrap'>
                  <input type='text' />
                  <span className='symbol-icon'>%</span>
                </span>
              </div>
            </div>
            <div className='input-wrap flex-box'>
              <div className='left-input employer-match'>
                <p>
                  <span className='form-subheading'>Employer match limit</span>
                  <input type='radio' />
                  <label>$</label>
                  <input type='radio' />
                  <label>%</label>
                </p>
              </div>
              <div className='right-input'>
                <span className='symbol-wrap'>
                  <input type='text' />
                  <span className='symbol-icon'>$</span>
                </span>
              </div>
            </div>
            <div className='input-wrap performance flex-box'>
              <div className='left-input'>
                <p>
                  <span className='form-subheading'>Include employer match in performance?</span>
                  <a href='/link30'>
                    <InfoIcon />
                  </a>
                </p>
              </div>
              <div className='right-input radio'>
                <input type='radio' />
                <label>Yes</label>
                <input type='radio' />
                <label>No</label>
              </div>
            </div>
          </div>
          <div className='estimated-annual-return'>
            <div className='estimated-top-content flex-box'>
              <span className='form-subheading'>Estimated annual returns</span>
              <span className='form-subheading-right'>This will be used to show projections in your charts.</span>
            </div>

            <p>
              <input type='radio' />
              <label>Use a calculation based on historical returns</label>
            </p>
            <p className='flex-box'>
              <span className='estimate-left'>
                <input type='radio' />
                <label> Use my own estimate</label>
              </span>
              <span className='estimate-right'>
                <input type='text' />
              </span>
            </p>
          </div>
          <div className='setting-button-wrap flex-box'>
            <button className='bg-white cancel-btn mm-btn-primary-outline' type='submit'>
              Cancel
            </button>
            <button className='bg-primary submit mm-btn-primary-outline' type='submit'>
              Next
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
