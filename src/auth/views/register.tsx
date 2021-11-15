// TODO I don't think this file is used, please confirm and delete
import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from 'layouts/auth.layout';
import { RegisterPayload } from 'auth/auth.types';
import { useModal, Modal } from 'common/components/modal';
import { appRouteConstants } from 'app/app-route.constant';
import { registerValidationSchema } from 'auth/auth.validation';

import RegisterForm from './register-form';

const initialValues: RegisterPayload = {
  email: '',
  password: '',
  subscriptionPriceId: '',
  mailChimpSubscription: false,
};

const Register = () => {
  const { t } = useTranslation();
  const registerModal = useModal(true);

  const at = (text: string) => t(`auth.${text}`);

  return (
    <AuthLayout>
      <Modal title='Register Restaurant' {...registerModal.props}>
        <Formik
          validateOnBlur
          initialValues={initialValues}
          validationSchema={registerValidationSchema}
          onSubmit={async (values, actions) => {}}
        >
          {(props) => {
            return <RegisterForm props={props} />;
          }}
        </Formik>
        <div className='text-center mt-4'>
          <Link to={appRouteConstants.auth.LOGIN} className='primary-link text-primary '>
            {at('ALREADY_HAVE_ACCOUNT')}
          </Link>
        </div>
      </Modal>
    </AuthLayout>
  );
};

export default Register;
