import React from 'react';

const VerticalRadioField = props => (
  <div>
    <div className="form-check">
      <input className="form-check-input" {...props.input} checked={props.radioValue === props.input.value} value={props.radioValue} type="radio" />
      <label className="form-check-label">{props.label}</label>
    </div>
    {props.meta.touched && props.meta.error && !props.ignoreError 
      && <div className="invalid-feedback">{props.meta.error}</div> }
  </div>
);

export default VerticalRadioField;