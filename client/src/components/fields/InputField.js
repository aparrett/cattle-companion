import React from 'react';

const InputField = props => {
  let classes = 'form-control';
  
  if (props.meta.touched && props.meta.error && !props.ignoreError)
    classes += ' error';

  return (
    <div>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input className={classes} {...props.input} placeholder={props.placeholder} type={props.type} pattern={props.pattern} />
      {props.meta.touched 
        && props.meta.error 
        && !props.ignoreError
        && <div className="invalid-feedback">{props.meta.error}</div>}
    </div>
  );
};

export default InputField;