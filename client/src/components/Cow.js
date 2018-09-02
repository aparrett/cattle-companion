import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCow } from '../actions/cattle';
import { fetchIncidents } from '../actions/incidents';
import { showAddIncident } from '../actions/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Cow extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);

    // Fetch the list of incidents to be used by the add incident modal.
    this.props.fetchIncidents();
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
    const { isLoading, cow } = this.props;

    return (
      <div>
        { isLoading 
          ? null 
          : <div>
              <div className="mt-5">
                <div>
                  <h1 className="font-weight-bold d-inline-block">{cow.name}</h1>
                  <div className="ml-2 d-inline-block">
                    <Link className="heading-icon-link" to={`/farms/${cow.farmId}/cattle/${cow._id}/edit`}>
                      <FontAwesomeIcon className="text-secondary fa-lg d-inline-block" icon="pencil-alt" />
                    </Link>
                    <a className="heading-icon-link">
                      <FontAwesomeIcon className="text-danger fa-lg d-inline-block" icon="trash-alt" />
                    </a>
                  </div>
                </div>
                <h4 className="text-muted">Gender: {cow.gender}</h4>
                <h4 className="text-muted">DOB: {cow.dateOfBirth}</h4>
              </div>
              <div className="mt-4">
                <h3 className="text-center">Incidents</h3>
                <ul className="list-group mt-4">
                  {cow.incidents && this.renderIncidents()}
                </ul>
                <div className="text-right">
                  <button className="btn btn-outline-primary mt-3" onClick={this.handleAddIncidentClick.bind(this)}>Add Incident</button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-center">Parents</h3>
                
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
export default connect(mapStateToProps, { fetchCow, fetchIncidents, showAddIncident })(Cow);
