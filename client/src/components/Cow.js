import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCow } from '../actions/cattle';
import { fetchIncidents } from '../actions/incidents';
import { showAddIncident } from '../actions/modals';

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
      .map((incident, i) => (
        <li key={i}>{incident.name} {incident.date}</li>
      ));
  }

  render() {
    const { isLoading, cow } = this.props;
    return (
      <div>
        { isLoading 
          ? null 
          : <div>
              <h1>{cow.name}</h1>
              <h2>Gender: {cow.gender}</h2>
              <h2>DOB: {cow.dateOfBirth}</h2>
              <Link to={`/farms/${cow.farmId}/cattle/${cow._id}/edit`}>Edit</Link>
              <ul>
                {cow.incidents && this.renderIncidents()}
              </ul>
              <button onClick={this.handleAddIncidentClick.bind(this)}>Add Incident</button>
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
