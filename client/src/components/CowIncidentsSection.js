import React from 'react';
import CowIncidentList from './CowIncidentList';

const CowIncidentsSection = ({ incidents, handleAddIncidentClick }) => (
  <div className="mt-4">
    <h3 className="text-center">Incidents</h3>
    <ul className="list-group mt-4">
      <CowIncidentList incidents={incidents} />
    </ul>
    <button className="btn btn-outline-primary mt-3" onClick={handleAddIncidentClick}>
      Add Incident
    </button>
  </div>
);

export default CowIncidentsSection;
