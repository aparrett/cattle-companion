import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCow } from '../actions/cattle';
import { fetchIncidents } from '../actions/incidents';
import { showAddIncident } from '../actions/modals';

class Cow extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);
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
              <h1>{cow.name} <Link to={`/farms/${cow.farmId}/cattle/${cow._id}/edit`}>Edit</Link></h1> 
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
