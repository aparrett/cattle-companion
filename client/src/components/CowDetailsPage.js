import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCow, deleteCow } from '../actions/cattle';
import { fetchIncidents } from '../actions/incidents';
import { showAddIncident } from '../actions/modals';
import { showConfirmation } from '../actions/modals';
import CowDetails from './CowDetails';
import CowParentsSection from './CowParentsSection';
import CowChildrenSection from './CowChildrenSection';
import CowIncidentsSection from './CowIncidentsSection';

class CowDetailsPage extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);

    // The list of incidents will be used by the add incident modal.
    this.props.fetchIncidents();
  }

  componentDidUpdate() {
    const {
      cow,
      fetchCow,
      isLoading,
      error,
      match: {
        params: { id }
      }
    } = this.props;

    // Ensure that the new cow is fetched if the id changes in the route.
    if (!isLoading && !error && cow._id !== id) {
      fetchCow(id);
    }
  }

  handleAddIncidentClick() {
    this.props.showAddIncident(this.props.cow);
  }

  handleDeleteClick() {
    const {
      showConfirmation,
      deleteCow,
      history,
      cow,
      match: {
        params: { farmId }
      }
    } = this.props;

    showConfirmation(cow._id, `Are you sure you want to delete ${cow.name}?`, id => {
      deleteCow(id);
      history.push(`/farms/${farmId}`);
    });
  }

  render() {
    const {
      isLoading,
      error,
      cow: { _id, name, farm, gender, dateOfBirth, mother, father, incidents, children }
    } = this.props;

    if (isLoading || !this.props.cow.name) return null;

    if (error) return <div className="invalid-feedback">{error}</div>;

    return (
      <div>
        <CowDetails
          handleDeleteClick={this.handleDeleteClick.bind(this)}
          id={_id}
          farm={farm}
          gender={gender}
          dateOfBirth={dateOfBirth}
          name={name}
        />
        <CowIncidentsSection
          incidents={incidents}
          handleAddIncidentClick={this.handleAddIncidentClick.bind(this)}
        />
        <CowParentsSection name={name} mother={mother} father={father} />
        <CowChildrenSection name={name} children={children} />
      </div>
    );
  }
}

function mapStateToProps({ cowReducer: { cow, isLoading, error } }) {
  return { cow, isLoading, error };
}
export default connect(
  mapStateToProps,
  { fetchCow, fetchIncidents, showAddIncident, showConfirmation, deleteCow }
)(CowDetailsPage);
