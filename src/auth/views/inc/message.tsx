import React from 'react';

import { ReactComponent as TickIcon } from 'assets/images/login/tick-icon.svg';
import { ReactComponent as CrossIcon } from 'assets/images/login/cross-icon.svg';

interface MessageProps {
  message: string;
  type: string;
  onDismiss: () => void;
}
const Message: React.FC<MessageProps> = ({ type, message, onDismiss }) => {
  const classes = type === 'success' ? 'message-container success' : 'message-container error';

  const icon =
    type === 'success' ? (
      <TickIcon onClick={onDismiss} className='icon' />
    ) : (
      <CrossIcon onClick={onDismiss} className='icon' />
    );

  return (
    <div className={classes}>
        <div className='message-wrapper'>
          {icon}
          {message}
        </div>
    </div>
  );
};

export default Message;
