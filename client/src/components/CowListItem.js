import React from 'react';
import { Link } from 'react-router-dom';
import { deleteCow } from '../actions/cattle';
import { showConfirmation } from '../actions/modals';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CowListItem = ({ cow, deleteCow, showConfirmation }) => (
  <li className="list-group-item" key={cow._id}>
    <div className="row justify-content-between">
      <div className="col-6">
        <Link to={`/farms/${cow.farm}/cattle/${cow._id}`}>{cow.name}</Link>
      </div>
      <div className="col-6 text-right">
        <Link to={`/farms/${cow.farm}/cattle/${cow._id}/edit`}>
          <FontAwesomeIcon className="text-secondary fa-lg d-inline-block mr-3" icon="pencil-alt" />
        </Link>
        <a
          onClick={() =>
            showConfirmation(cow._id, `Are you sure you want to delete ${cow.name}?`, deleteCow)
          }
        >
          <FontAwesomeIcon className="text-danger fa-lg d-inline-block" icon="trash-alt" />
        </a>
      </div>
    </div>
  </li>
);

export default connect(
  null,
  { deleteCow, showConfirmation }
)(CowListItem);
