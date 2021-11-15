import React from 'react';
import { ReactComponent as Spinner } from 'assets/icons/spinner.svg';

function CircularSpinner() {
  return (
    <div className='d-flex align-items-center justify-content-center h-100'>
      <Spinner style={{ width: 40, height: 40 }} />
    </div>
  );
}

export default CircularSpinner;
