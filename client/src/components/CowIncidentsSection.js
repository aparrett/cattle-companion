import React, { Component } from 'react';
import { connect } from 'react-redux';
import CowIncidentList from './CowIncidentList';
import { showAddIncident } from '../actions/modals';

export class CowIncidentsSection extends Component {
  handleAddIncidentClick() {
    this.props.showAddIncident(this.props.cow);
  }

  render() {
    const incidents = this.props.cow.incidents || [];

    return (
      <div className="mt-4">
        <h3 className="text-center">Incidents</h3>
        <ul className="list-group mt-4">
          <CowIncidentList incidents={incidents} />
        </ul>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={this.handleAddIncidentClick.bind(this)}
        >
          Add Incident
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { showAddIncident }
)(CowIncidentsSection);
