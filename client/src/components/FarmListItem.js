import React from 'react';
import { Link } from 'react-router-dom';
import { deleteFarm } from '../actions/farms';
import { showConfirmation } from '../actions/modals';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FarmListItem = ({ farm, deleteFarm, showConfirmation }) => (
  <li className="list-group-item" key={farm._id}>
    <div className="row justify-content-between">
      <div className="col-6">
        <Link to={`/farms/${farm._id}`}>{farm.name}</Link>
      </div>
      <div className="col-6 text-right">
        <a onClick={() => showConfirmation(farm._id, `Are you sure you want to delete the farm ${farm.name}?`, deleteFarm)}>
          <FontAwesomeIcon className="text-danger fa-lg d-inline-block" icon="trash-alt" />
        </a>
      </div>
    </div>
  </li>
);

export default connect(null, { deleteFarm, showConfirmation })(FarmListItem);
