import React from 'react';

const Input = field => {
  const { meta: { touched, error } } = field;

  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label className="control-label">{field.label}</label>
      <div>
        <input
          className="form-control"
          type={field.type || 'text'}
          {...field.input}
        />
      </div>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div>
  );
};

export default Input;
