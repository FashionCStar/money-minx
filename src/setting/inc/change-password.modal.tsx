import { Formik } from 'formik';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

import { changePassword } from 'auth/auth.service';
import { useAuthDispatch } from 'auth/auth.context';
import { Modal, ModalType } from 'common/components/modal';
import { ReactComponent as HiddenIcon } from 'assets/icons/pass-hidden.svg';
import { ReactComponent as VisibleIcon } from 'assets/icons/pass-visible.svg';

interface ChangePasswordProps {
  changePasswordModal: ModalType;
}

const ChangePasswordModal: React.FC<ChangePasswordProps> = ({ changePasswordModal }) => {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const dispatch = useAuthDispatch();
  const [validator, setValidator] = useState<number>(0);

  const reg1 = /^.{8,}$/;
  const reg2 = /(^.*\d+.*$)/;
  const reg3 = /(^.*[@$!%*#?&].*$)/;
  const reg4 = /(^.*[A-Z].*$)/;

  const isVisible = (field: string) => visible[field];

  const toggleVisibility = (field: string) => {
    setVisible({ ...visible, [field]: !visible[field] });
  };

  const visibilityIcon = (field: string) => (isVisible(field) ? <VisibleIcon /> : <HiddenIcon />);

  const getValidationText = () => {
    if (validator < 2) {
      return {
        text: 'Weak, please choose another',
        classNames: 'text-danger ',
      };
    }
    if (validator < 3) {
      return {
        text: 'Medium',
        classNames: 'text-warning',
      };
    }

    return {
      text: 'Strong',
      classNames: 'text-success',
    };
  };

  return (
    <Modal {...changePasswordModal.props} title='Change Password' size='sm' canBeClosed>
      <div className='modal-wrapper change-password-modal'>
        <Formik
          initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
          validate={(values) => {
            if (!values.newPassword) {
              return {};
            }
            let a = 0;
            [reg1, reg2, reg3, reg4].forEach((reg) => (reg.test(values.newPassword) ? (a += 1) : a));
            setValidator(a);
          }}
          onSubmit={async (values, actions) => {
            let hasError = false;
            const newPassword = values.newPassword;
            const oldPassword = values.oldPassword;
            const confirmPassword = values.confirmPassword;

            if (!oldPassword) {
              actions.setFieldError('oldPassword', 'You forgot to include old password');
              hasError = true;
            }

            if (!newPassword) {
              actions.setFieldError('newPassword', 'You forgot to include new password');
              hasError = true;
            }

            if (!confirmPassword) {
              actions.setFieldError('confirmPassword', 'You forgot to confirm password');
              hasError = true;
            }

            if (newPassword !== confirmPassword) {
              actions.setFieldError('confirmPassword', 'Passwords do not match');
              hasError = true;
            }

            if (hasError) {
              return;
            }

            const { error } = await changePassword({ dispatch, payload: { newPassword, oldPassword } });

            if (error && error.message) {
              actions.setFieldError('confirmPassword', error.message);
            } else {
              toast('Password updated successfully.', { type: 'success' });
              changePasswordModal.close();
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className='input-wrapper'>
                <label className='form-subheading'>Current Password</label>
                <div className='input-wrap'>
                  <input
                    type={isVisible('oldPassword') ? 'text' : 'password'}
                    className='password'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.oldPassword}
                    name='oldPassword'
                    placeholder='Old Password'
                  />
                  <span className='visibility-icon' onClick={() => toggleVisibility('oldPassword')} role='button'>
                    {visibilityIcon('oldPassword')}
                  </span>
                </div>
                {props.errors.oldPassword && <div className='feedback'>{props.errors.oldPassword}</div>}
              </div>
              <div className='input-wrapper'>
                <label className='form-subheading'>New Password</label>
                <div className='input-wrap'>
                  <input
                    type={isVisible('newPassword') ? 'text' : 'password'}
                    className='password'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.newPassword}
                    name='newPassword'
                    placeholder='New Password'
                  />
                  <span className='visibility-icon' onClick={() => toggleVisibility('newPassword')} role='button'>
                    {visibilityIcon('newPassword')}
                  </span>
                </div>
                {props.values.newPassword && (
                  <div className={`${getValidationText().classNames} pt-1`}>{getValidationText().text}</div>
                )}
                {props.errors.newPassword ? <div className='feedback'>{props.errors.newPassword}</div> : null}
              </div>
              <div className='input-wrapper pt-0'>
                <div className='input-wrap'>
                  <input
                    type={isVisible('confirmPassword') ? 'text' : 'password'}
                    className='password'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.confirmPassword}
                    name='confirmPassword'
                    placeholder='Confirm Password'
                  />
                  <span className='visibility-icon' onClick={() => toggleVisibility('confirmPassword')} role='button'>
                    {visibilityIcon('confirmPassword')}
                  </span>
                </div>
                {props.errors.confirmPassword && <div className='feedback'>{props.errors.confirmPassword}</div>}
              </div>
              <button type='submit' className='mm-btn-animate mm-btn-primary'>
                Save Password
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
