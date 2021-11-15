import React from 'react';
import { InputType } from '../component.type';

const FileInput: React.FC<InputType> = ({
  name,
  title,
  value,
  helperText,
  handleChange,
  handleOnBlur,
  error = false,
  placeholder = 'Enter value',
}) => {
  const helperTextClass = error ? `show invalid-feedback` : `form-text text-muted`;

  return (
    <div className='form-group pt-3'>
      <label>{title}</label>
      <div className='custom-file mb-3'>
        <input
          name={name}
          type='file'
          accept='image/*'
          onBlur={handleOnBlur}
          onChange={handleChange}
          id={name}
          className='form-control custom-file-input'
          aria-describedby={`inputHelp-${name}`}
        />
        <label className='custom-file-label' htmlFor={name}>
          {(value as any)?.name || placeholder}
        </label>
        {helperText && (
          <small id={`inputHelp-${name}`} className={helperTextClass}>
            {helperText}
          </small>
        )}
      </div>
    </div>
  );
};

export default FileInput;
