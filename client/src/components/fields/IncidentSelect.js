import React from 'react';

const IncidentSelect = props => {
  const renderIncidentOptions = incidents => incidents
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    .map((incident, i) => (
      <option key={i} value={incident.name}>{incident.name}</option>
    ));

  return (
    <div className="form-group">
      <label>{props.label}</label>
      <select className="form-control" {...props.input}>
        <option value="">Select...</option>
        {renderIncidentOptions(props.incidents)}
      </select>
    </div>
  );
};

export default IncidentSelect;