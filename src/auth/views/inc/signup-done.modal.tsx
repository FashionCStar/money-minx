import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'common/components/modal';
import { ReactComponent as SignupModalLogo } from 'assets/images/signup/signup-modal-logo.svg';

interface Props {
  signupModal: any;
  message: string;
  handleSuccess: () => void;
}
const SignUpDoneModal: React.FC<Props> = ({ signupModal, message, handleSuccess }) => {
  return (
    <Modal {...signupModal} title='Welcome to Money Minx' size='lg' onSuccess={handleSuccess}>
      <div className='modal-wrapper signup-modal'>
        <div className='signup-done-modal-logo'>
          <SignupModalLogo />
        </div>
        <p>
          You successfully joined Money Minx. We advise you to go and finish your profile in the settings. There, you
          can also link more accounts and check all the details that you might find interesting.
        </p>
        <div className='modal-btn-wrapper'>
          <button className='mm-btn bg-primary mm-btn-primary-outline text-white' onClick={handleSuccess}>
            Go to Account Settings
          </button>
          <div className='create-new-btn text-center'>
            <Link to='/dashboard'>Go to Dashboard instead</Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpDoneModal;
