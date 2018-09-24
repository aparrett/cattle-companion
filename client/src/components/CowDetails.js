import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CowDetails = ({ handleDeleteClick, _id, farm, gender, dateOfBirth, name }) => (
  <div className="mt-5">
    <div>
      <h1 className="font-weight-bold d-inline-block">{name}</h1>
      <div className="ml-2 d-inline-block">
        <Link className="heading-icon-link" to={`/farms/${farm._id}/cattle/${_id}/edit`}>
          <FontAwesomeIcon className="text-secondary fa-lg d-inline-block" icon="pencil-alt" />
        </Link>
        <a onClick={handleDeleteClick} className="heading-icon-link">
          <FontAwesomeIcon className="text-danger fa-lg d-inline-block" icon="trash-alt" />
        </a>
      </div>
    </div>
    <h4><Link to={`/farms/${farm._id}`}>{farm.name}</Link></h4>
    <h4 className="text-muted">Gender: {gender}</h4>
    <h4 className="text-muted">DOB: {dateOfBirth}</h4>
  </div>
);

export default CowDetails;