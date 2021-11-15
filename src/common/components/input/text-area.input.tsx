import React from 'react';
import { InputType } from '../component.type';

const TextArea: React.FC<InputType> = ({
  name,
  title,
  helperText,
  handleChange,
  handleOnBlur,
  error = false,
  type = 'text',
  placeholder = 'Enter value',
}) => {
  const helperTextClass = error ? `show invalid-feedback` : `form-text text-muted`;
  return (
    <div className='form-group pt-3'>
      <label htmlFor={name}>{title}</label>
      <textarea
        rows={3}
        id={name}
        name={name}
        onBlur={handleOnBlur}
        onChange={handleChange}
        className='form-control'
        placeholder={placeholder}
        aria-describedby={`inputHelp-${name}`}
      />
      {helperText && (
        <small id={`inputHelp-${name}`} className={helperTextClass}>
          {helperText}
        </small>
      )}
    </div>
  );
};

export default TextArea;
