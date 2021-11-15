import React, { useState } from 'react';

interface InlineAlertProps {
  type?: 'warning' | 'info' | 'success' | 'danger';
  message: string;
  open: boolean;
  onClose: () => void;
  onClick?: () => void;
}

export interface AlertType {
  open: () => void;
  close: () => void;
  props: {
    open: boolean;
    onClose: () => void;
  };
}

export const InlineAlert: React.FC<InlineAlertProps> = ({ message, open, onClose, type = 'warning', onClick }) => {
  let classNames = `inline-alert bg-${type}`;
  classNames += !open ? ' hidden' : '';

  return (
    <div className={classNames}>
      <span onClick={onClick} role='alert'>
        {message}
      </span>
      <button type='button' className='close-alert' onClick={() => onClose()} />
    </div>
  );
};

export const useAlert = (): AlertType => {
  const [open, setOpen] = useState(false);

  return {
    open: () => setOpen(true),
    close: () => setOpen(false),
    props: {
      open,
      onClose: () => setOpen(false),
    },
  };
};
