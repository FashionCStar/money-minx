import React from 'react';
import { useHistory } from 'react-router-dom';

import { InlineAlert } from 'common/components/alert';
import { ConnectionAlertProps } from 'networth/networth.type';

const ConnectionAlert: React.FC<ConnectionAlertProps> = ({ connectionAlert, message }) => {
  const history = useHistory();

  return (
    <InlineAlert {...connectionAlert.props} message={message} onClick={() => history.push('/settings?active=Plan')} />
  );
};

export default ConnectionAlert;
