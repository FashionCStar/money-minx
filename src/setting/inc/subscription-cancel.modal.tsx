import React from 'react';
import moment from 'moment';
import { Modal, ModalType } from 'common/components/modal';
import { Link } from 'react-router-dom';

interface Props {
  subscriptionEnd?:  number;
  subscriptionCancelModal: ModalType;
  handleCancelSubscriptionConfirmation: () => void;
}

const SubscriptionCancelModal: React.FC<Props> = ({ subscriptionCancelModal, subscriptionEnd , handleCancelSubscriptionConfirmation}) => {

  const subscriptionEndDate = subscriptionEnd ? subscriptionEnd / 86400: 0;
  const endingDate = subscriptionEndDate ? moment('01-01-1970').add(subscriptionEndDate, 'days').format('MM/DD/YY') : 'xx/xx/xx';

  return (
    <Modal {...subscriptionCancelModal.props} title='Sorry to see you go' size='md' canBeClosed>
      <div className='modal-wrapper signup-modal subscription-cancel-modal'>
        <p>
          Your account will remain active until <span>{endingDate}</span>. Please let us know why you decided to cancel
          and if there is anything we can do to improve our service by emailing{' '}
          <a href='mailto:hello@moneyminx.com' className=''>hello@moneyminx.com</a>.
        </p>
        <div className='modal-btn-wrapper'>
          <button
            className='mm-btn-animate mm-btn-primary'
            onClick={() => subscriptionCancelModal.close()}
          >
            Never mind
          </button>
          <div className='text-center'>
            <Link className='link-gray' to='/settings' onClick={handleCancelSubscriptionConfirmation}>Confirm Cancellation</Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionCancelModal;
