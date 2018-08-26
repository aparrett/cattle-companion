import React from 'react';

const InputField = props => {
  return (
    <div>
      <input className="form-control" {...props.input} placeholder={props.placeholder} type={props.type} pattern={props.pattern} />
      {props.meta.touched 
        && props.meta.error 
        && !props.ignoreError
        && <div className="alert-danger">{props.meta.error}</div>}
    </div>
  );
}

export default InputField;