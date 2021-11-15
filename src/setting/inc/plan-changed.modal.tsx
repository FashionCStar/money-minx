import React from 'react';
import { Modal } from 'common/components/modal';

interface Props {
  planChangedModal: any;
  onSuccess: () => void;
}

const PlanChangedModal: React.FC<Props> = ({ planChangedModal, onSuccess }) => {
  return (
    <Modal {...planChangedModal.props} title='Plan Changed' size='md' canBeClosed onClose={onSuccess}>
      <div className='modal-wrapper signup-modal'>
        <p>You are now subscribed to the Early Adopter Pro Plan monthly for $22.</p>
        <div className='modal-btn-wrapper'>
          <button className='mm-btn bg-primary mm-btn-primary-outline text-white' onClick={onSuccess}>
            Onwards!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PlanChangedModal;
