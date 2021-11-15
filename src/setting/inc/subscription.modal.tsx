import React from 'react';

import { Modal } from 'common/components/modal';

interface Props {
  subscriptionModal: any;
  onSuccess: () => void;
}

const SubscriptionModal: React.FC<Props> = ({ subscriptionModal, onSuccess }) => {
  return (
    <Modal {...subscriptionModal.props} title='Thanks for subscribing!' size='md' canBeClosed onClose={onSuccess}>
      <div className='modal-wrapper signup-modal'>
        <p>
          We are thrilled to welcome you to the Money Minx family. Your support allows us to continuously add more
          futures and functionality to Money Minx.
        </p>
        <div className='modal-btn-wrapper'>
          <button className='mm-btn bg-primary mm-btn-primary-outline text-white' onClick={onSuccess}>
            Onwards!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
