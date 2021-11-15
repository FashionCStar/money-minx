import React from 'react';
import Form from 'react-bootstrap/Form';
import { Modal, ModalType } from 'common/components/modal';

interface FieldChangeModal {
  fieldChangeModal: ModalType;
}

const FieldChangeModal: React.FC<FieldChangeModal> = ({ fieldChangeModal }) => {
  return (
    <Modal {...fieldChangeModal.props} title='' size='xl' canBeClosed onClose={() => fieldChangeModal.close()}>
      <div className='modal-wrapper chart-setting-modal'>
        <div className='mm-field-change-modal'>
          <div className='mm-field-change-modal__title'>Peer Street</div>
          <p>How would you like to classify this position?</p>
          <Form>
            <Form.Group controlId='type'>
              <Form.Label className='mm-field-change-modal__sub-title'>Type</Form.Label>
              <Form.Control as='select' custom>
                <option>Unclassified</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='class'>
              <Form.Label className='mm-field-change-modal__sub-title'>Class</Form.Label>
              <Form.Control as='select' custom>
                <option>Unclassified</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
              <Form.Label className='mm-field-change-modal__sub-title'>Country</Form.Label>
              <Form.Control as='select' custom>
                <option>Unclassified</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='risk'>
              <Form.Label className='mm-field-change-modal__sub-title'>Risk</Form.Label>
              <Form.Control as='select' custom>
                <option>Unclassified</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default FieldChangeModal;
