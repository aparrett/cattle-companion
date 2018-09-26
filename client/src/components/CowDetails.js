import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showConfirmation } from '../actions/modals';
import { deleteCow } from '../actions/cattle';

export class CowDetails extends Component {
  handleDeleteClick() {
    const { showConfirmation, deleteCow, history, cow } = this.props;

    showConfirmation(cow._id, `Are you sure you want to delete ${cow.name}?`, id => {
      deleteCow(id);
      history.push(`/farms/${cow.farm._id}`);
    });
  }

  render() {
    const { cow } = this.props;

    return (
      <div className="mt-5">
        <div>
          <h1 className="font-weight-bold d-inline-block">{cow.name}</h1>
          <div className="ml-2 d-inline-block">
            <Link
              className="heading-icon-link"
              to={`/farms/${cow.farm._id}/cattle/${cow._id}/edit`}
            >
              <FontAwesomeIcon className="text-secondary fa-lg d-inline-block" icon="pencil-alt" />
            </Link>
            <a onClick={this.handleDeleteClick.bind(this)} className="delete-cow heading-icon-link">
              <FontAwesomeIcon className="text-danger fa-lg d-inline-block" icon="trash-alt" />
            </a>
          </div>
        </div>
        <h4>
          <Link to={`/farms/${cow.farm._id}`}>{cow.farm.name}</Link>
        </h4>
        <h4 className="text-muted">Gender: {cow.gender}</h4>
        <h4 className="text-muted">DOB: {cow.dateOfBirth}</h4>
      </div>
    );
  }
}

export default connect(
  null,
  { showConfirmation, deleteCow }
)(CowDetails);
