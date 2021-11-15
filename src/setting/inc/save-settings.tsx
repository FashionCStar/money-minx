import React from 'react';

interface SaveSettingProps {
  handleSave: (args: any) => void;
  statusText: string
}

const SaveSettings: React.FC<SaveSettingProps> = ({ handleSave, statusText }) => {
  return (
    <div className='action-overlay'>
      <button type='button' className='btn btn-lg mm-button float-right' onClick={handleSave}>
        {statusText === 'Saving...' && <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'/>}
        <span className={'ml-1'}> {statusText}</span>
      </button>
    </div>
  );
};

export default SaveSettings;
