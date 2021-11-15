import { toast } from 'react-toastify';
import React, { useEffect, useRef, useState } from 'react';

import { useAuthDispatch } from 'auth/auth.context';
import { getRefreshedProfile } from 'auth/auth.service';
import { Modal, ModalTypeEnum } from 'common/components/modal';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import useYodlee from './useYodlee';
import { FastLinkOptionsType } from './yodlee.type';

interface Props {
  fastLinkModal: any;
  handleSuccess: () => void;
  fastLinkOptions: FastLinkOptionsType;
}

const FastLinkModal: React.FC<Props> = ({ fastLinkModal, handleSuccess, fastLinkOptions }) => {
  const initRef = useRef<any>();
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onSuccess = () => {
    toast('Successfully Logged in with Yodlee', { type: 'success' });
  };

  const onError = () => {
    toast('Error Occurred', { type: 'error' });
  };

  const onClose = async (args: any) => {
    setLoading(true);
    const { error } = await getRefreshedProfile({ dispatch });
    if (error) {
      toast('Error Occurred on Fetching user Details', { type: 'error' });
    }
    setLoading(false);
    handleSuccess();
  };

  const { init } = useYodlee({
    fastLinkOptions,
    onSuccess,
    onError,
    onClose,
  });

  const token = (fastLinkOptions.token as any) || '';
  const open = fastLinkModal?.props?.open;

  useEffect(() => {
    initRef?.current?.click();
  }, [open]);

  const handleInit = () => {
    init({ tokenValue: token, tokenType: 'AccessToken' });
  };

  return (
    <Modal {...fastLinkModal.props} title='' size={'xs'} type={ModalTypeEnum.NO_HEADER} canBeClosed>
      <div id='fastlinkContainer' />
      {loading ? <CircularSpinner /> : null}
      <button ref={initRef} onClick={handleInit} className='hidden' />
    </Modal>
  );
};

export default FastLinkModal;
