import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCow } from '../actions/cattle';
import { fetchIncidents } from '../actions/incidents';
import { showAddIncident } from '../actions/modals';
import { showConfirmation } from '../actions/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Cow extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);

    // Fetch the list of incidents to be used by the add incident modal.
    this.props.fetchIncidents();
  }

  componentDidUpdate() {
    const { cow, fetchCow, isLoading, match: { params: { id } } } = this.props;

    if (!isLoading && cow._id !== id) {
      fetchCow(id);
    }
  }

  handleAddIncidentClick() {
    this.props.showAddIncident(this.props.cow);
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
    const { isLoading, cow: { _id, name, farmId, gender, dateOfBirth, mother, father, incidents } } = this.props;

    return (
      <div className="mb-5">
        { isLoading 
          ? null 
          : <div>
              <div className="mt-5">
                <div>
                  <h1 className="font-weight-bold d-inline-block">{name}</h1>
                  <div className="ml-2 d-inline-block">
                    <Link className="heading-icon-link" to={`/farms/${farmId}/cattle/${_id}/edit`}>
                      <FontAwesomeIcon className="text-secondary fa-lg d-inline-block" icon="pencil-alt" />
                    </Link>
                    <a className="heading-icon-link">
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
                <div className="text-right">
                  <button className="btn btn-outline-primary mt-3" onClick={this.handleAddIncidentClick.bind(this)}>Add Incident</button>
                </div>
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
            </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ cowReducer: { cow, isLoading } }) {
  return { cow, isLoading };
}
export default connect(mapStateToProps, 
  { fetchCow, fetchIncidents, showAddIncident, showConfirmation }
)(Cow);
