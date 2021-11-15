import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface Size {
  xl: string;
  lg: string;
  mdx: string;
  md: string;
  sm: string;
  xs: string;
}

export enum ModalTypeEnum {
  NO_HEADER = 'NO_HEADER',
}

interface Props {
  title: string;
  open: boolean;
  backdrop?: boolean;
  canBeClosed?: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  size?: keyof Size;
  type?: ModalTypeEnum;
}

export interface ModalType {
  open: () => void;
  close: () => void;
  props: {
    open: boolean;
    onClose: () => void;
  };
}

const Modal: React.FC<Props> = ({
  open,
  title,
  onClose,
  children,
  size = 'md',
  backdrop = true,
  canBeClosed = false,
  type,
}) => {
  const classNames = `${backdrop ? 'modal mm-modal-backdrop' : 'modal'} modal-${open ? 'show' : 'hide'}`;
  const modalClasses = `modal-dialog modal-dialog-centered modal-${size}`;
  const clickOutsideModalHandler = (event: any) => {
    if (event?.target?.className === 'modal mm-modal-backdrop modal-show') {
      onClose();
    }
  }

  return (
    <div className={classNames} tabIndex={-1} role='dialog' aria-hidden='true' onClick={clickOutsideModalHandler}>
      <div className={modalClasses} role='document'>
        <div className='modal-content'>
          {type === ModalTypeEnum.NO_HEADER ? null : (
            <div className='modal-header'>
              <h5 className='modal-title'>{title}</h5>
              {canBeClosed && (
                <div onClick={() => onClose()} className='close' role='button'>
                  <AiOutlineClose className='modal-close'/>
                </div>
              )}
            </div>
          )}
          <div className='modal-body'>{children}</div>
        </div>
      </div>
    </div>
  );
};

function useModal(state: boolean = false): ModalType {
  const [open, setOpen] = useState(state);
  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    props: {
      open,
      onClose: () => setOpen(false),
    },
  };
}

export { Modal, useModal };
