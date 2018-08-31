import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCow } from '../actions/cattle';
import { showConfirmation } from '../actions/modals';
import { connect } from 'react-redux';

const CowListItem = ({ cow, deleteCow, showConfirmation }) => (
  <li key={cow._id}>
    <p><Link to={`/farms/${cow.farmId}/cattle/${cow._id}`}>Name: {cow.name}</Link></p>
    <p>Gender: {cow.gender}</p>
    <p>Date of Birth: {cow.dateOfBirth}</p>
    <button className="btn-danger" 
      onClick={() => showConfirmation(deleteCow, cow._id, `Are you sure you want to delete cow ${cow.name}?`)}>
        Delete
    </button>
  </li>
);

export default connect(null, { deleteCow, showConfirmation })(CowListItem);