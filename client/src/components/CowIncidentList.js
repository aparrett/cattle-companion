import React from 'react';

const CowIncidentList = ({ incidents }) =>
  incidents.sort((a, b) => new Date(a.date) - new Date(b.date)).map((incident, i) => (
    <li className="list-group-item" key={i}>
      <div className="row justify-content-between">
        <div className="col-4">{incident.name}</div>
        <div className="col-4 text-right">{incident.date}</div>
      </div>
    </li>
  ));

export default CowIncidentList;
