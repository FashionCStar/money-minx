import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';

import { FormControl } from 'react-bootstrap';
import { Modal, ModalType } from 'common/components/modal';
import { patchAllocationChartSettings } from 'api/request.api';
import { useAllocationDispatch } from 'allocation/allocation.context';
import useAllocationSetting from 'allocation/hooks/useAllocationSetting';
import CircularSpinner from 'common/components/spinner/circular-spinner';

interface SettingModalProps {
  settingModal: ModalType;
}

const initialData = {
  title: '',
  description: '',
  showAmounts: false,
};

const SettingModal: React.FC<SettingModalProps> = ({ settingModal }) => {
  const [data, setData] = useState(initialData);
  const dispatch = useAllocationDispatch();
  const [error, setError] = useState<boolean>(false);

  const { loading, settings } = useAllocationSetting();

  useEffect(() => {
    if (settings) {
      setData({ ...(settings as any) });
    }
  }, [settings]);

  const validate = (e: React.ChangeEvent<any>) => {
    if (e.target.name === 'title' && e.target.value?.length > 70) {
      return setError(true);
    }

    return setError(false);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    validate(e);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCancel = () => settingModal.close();

  const handleSubmit = async () => {
    if (error) {
      return;
    }

    const { data: patchResponse, error: allocationError } = await patchAllocationChartSettings(data);

    if (!allocationError) {
      dispatch({ type: 'PATCH_ALLOCATION_CHART_SETTING', payload: { patchChartSettings: patchResponse } });
      setData({ ...patchResponse });
      settingModal.close();
    }
  };

  return (
    <Modal {...settingModal.props} title='Chart Settings' size='md' canBeClosed onClose={() => settingModal.close()}>
      {loading ? (
        <CircularSpinner />
      ) : (
        <div className='modal-wrapper chart-setting-modal mm-setting-modal'>
          <div className='mm-setting-modal__title'>
            <Form>
              <Form.Group controlId='exampleForm.ControlInput1'>
                <Form.Label className='mm-setting-modal__sub-title'>Title</Form.Label>
                <Form.Control
                  type='text'
                  size='lg'
                  placeholder='My super awesome allocation'
                  onChange={handleChange}
                  name='title'
                  value={data.title}
                  isInvalid={error}
                />
                <FormControl.Feedback type='invalid' className='feedback text-right'>
                  Chart titles can't be longer than 70 characters.
                </FormControl.Feedback>
              </Form.Group>
              <Form.Group controlId='exampleForm.ControlTextarea1'>
                <Form.Label className='mm-setting-modal__sub-title'>Chart Description</Form.Label>
                <Form.Control
                  as='textarea'
                  name='description'
                  placeholder='My super awesome allocation. What do you guys think? Been thinking of adding Bitcoin.'
                  onChange={handleChange}
                  value={data.description}
                />
              </Form.Group>
            </Form>
            <div className='mm-setting-modal__sub-title'>Show amounts?</div>
            <div className='d-flex justify-content-between'>
              <p>Do you want to show the value of each allocation?</p>
              <span className='mm-switch-block'>
                <input
                  value='true'
                  type='radio'
                  name='showAmount'
                  className='mm-switch-input'
                  aria-checked={data.showAmounts}
                  checked={data.showAmounts}
                />
                <label
                  className='mm-switch mt-md-0 mt-3'
                  role='button'
                  onClick={(e) => {
                    setData({ ...data, showAmounts: !data.showAmounts });
                  }}
                />
              </span>
            </div>
            <div className='action-wrapper'>
              <button className='btn-outline-primary mm-btn-animate' onClick={handleCancel}>
                Cancel
              </button>
              <button className='mm-btn-animate mm-btn-primary' onClick={handleSubmit}>
                Save <span className='hide-sm'>Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SettingModal;
