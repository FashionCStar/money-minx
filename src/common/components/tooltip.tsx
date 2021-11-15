import React from 'react';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';

interface MMTooltipProps {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  message: string;
  children: React.ReactElement;
}

const MMToolTip: React.FC<MMTooltipProps> = ({ placement = 'bottom', message, children }) => {
  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip id='tooltip-101'>{message}</Tooltip>}>
      {children}
    </OverlayTrigger>
  );
};

export default MMToolTip;
