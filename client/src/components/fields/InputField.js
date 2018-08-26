import React from 'react';

const InputField = props => {
  return (
    <div>
      <input className="form-control" {...props.input} placeholder={props.placeholder} type={props.type} />
      {props.meta.touched && props.meta.error && <div className="alert-danger">{props.meta.error}</div>}
    </div>
  );
}

export default InputField;