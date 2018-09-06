import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCow, deleteCow } from '../actions/cattle';
import { fetchIncidents } from '../actions/incidents';
import { showAddIncident } from '../actions/modals';
import { showConfirmation } from '../actions/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CowDetailsPage extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);

    // Fetch the list of incidents to be used by the add incident modal.
    this.props.fetchIncidents();
  }

  componentDidUpdate() {
    const { cow, fetchCow, isLoading, error, match: { params: { id } } } = this.props;

    if (!isLoading && !error && cow._id !== id) {
      fetchCow(id);
    }
  }

  handleAddIncidentClick() {
    this.props.showAddIncident(this.props.cow);
  }

  handleDeleteClick() {
    const { showConfirmation, deleteCow, history, cow, match: { params: { farmId } } } = this.props;
    showConfirmation(id => {
      deleteCow(id);
      history.push(`/farms/${farmId}`);
    }, cow._id, `Are you sure you want to delete cow ${cow.name}?`);
  }

  renderIncidents() {
    return this.props.cow.incidents
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((incident, i) => (
        <li className="list-group-item" key={i}>
          <div className="row justify-content-between">
            <div className="col-4">
              {incident.name}
            </div>
            <div className="col-4 text-right">
              {incident.date}
            </div>
          </div>
        </li>
      ));
  }

  render() {
    const { isLoading, error, cow: { _id, name, farmId, gender, dateOfBirth, mother, father, incidents, children } } = this.props;

    return (
      <div className="mb-5">
        { isLoading
          ? null 
          : error
            ? <div className="invalid-feedback">{error}</div>
            : <div>
                <div className="mt-5">
                  <div>
                    <h1 className="font-weight-bold d-inline-block">{name}</h1>
                    <div className="ml-2 d-inline-block">
                      <Link className="heading-icon-link" to={`/farms/${farmId}/cattle/${_id}/edit`}>
                        <FontAwesomeIcon className="text-secondary fa-lg d-inline-block" icon="pencil-alt" />
                      </Link>
                      <a onClick={this.handleDeleteClick.bind(this)} className="heading-icon-link">
                        <FontAwesomeIcon className="text-danger fa-lg d-inline-block" icon="trash-alt" />
                      </a>
                    </div>
                  </div>
                  <h4 className="text-muted">Gender: {gender}</h4>
                  <h4 className="text-muted">DOB: {dateOfBirth}</h4>
                </div>
                <div className="mt-4">
                  <h3 className="text-center">Incidents</h3>
                  <ul className="list-group mt-4">
                    {incidents && this.renderIncidents()}
                  </ul>
                  <button className="btn btn-outline-primary mt-3" 
                    onClick={this.handleAddIncidentClick.bind(this)}>Add Incident</button>
                </div>
                <div className="mt-4">
                  <h3 className="text-center">Parents</h3>
                  {!mother && !father 
                    ? <p>{name} does not have any parents.</p>
                    : <ul className="list-group mt-4">
                        {mother && 
                          <li className="list-group-item" key={mother._id}>
                            <Link to={`/farms/${mother.farmId}/cattle/${mother._id}`}>{mother.name}</Link>
                            &nbsp;- Mother
                          </li>
                        }
                        {father && 
                          <li className="list-group-item" key={father._id}>
                            <Link to={`/farms/${father.farmId}/cattle/${father._id}`}>{father.name}</Link>
                            &nbsp;- Father
                          </li>
                        }
                      </ul>
                  }
                </div>
                <div className="mt-4">
                  <h3 className="text-center">Children</h3>
                  {!children || children.length === 0
                    ? <p>{name} does not have any children.</p>
                    : <ul className="list-group mt-4">
                        {children.map(child => (
                          <li className="list-group-item" key={child._id}>
                            <Link to={`/farms/${child.farmId}/cattle/${child._id}`}>{child.name}</Link>
                          </li>
                        ))}
                      </ul>
                  }
                </div>
              </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ cowReducer: { cow, isLoading, error } }) {
  return { cow, isLoading, error };
}
export default connect(mapStateToProps, 
  { fetchCow, fetchIncidents, showAddIncident, showConfirmation, deleteCow }
)(CowDetailsPage);
