import React from 'react';

const InputField = props => {
  return (
    <div>
      <input className="form-control" {...props.input} type={props.type} />
      {props.meta.touched && props.meta.error && <div className="error">{props.meta.error}</div>}
    </div>
  );
}

export default InputField;