import React from 'react';
import { Modal } from 'common/components/modal';

interface Props {
  emailNeededModal: any;
}
const EmailNeededModal: React.FC<Props> = ({ emailNeededModal }) => {
  return (
    <Modal {...emailNeededModal.props} title='Email Missing' size='sm'>
      <div className='modal-wrapper'>
        <p>
          A valid email address is required to use Money Minx. We only use your email to communicate with you and never
          sell or share your email with others. Please try connecting again but do not change the email permission.
        </p>
        <div className='modal-btn-wrapper'>
          <button
            className='mm-btn-animate mm-btn-primary'
            onClick={() => emailNeededModal.close()}
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailNeededModal;
