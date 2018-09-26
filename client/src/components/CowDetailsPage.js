import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCow } from '../actions/cattle';
import { fetchIncidents } from '../actions/incidents';
import CowDetails from './CowDetails';
import CowParentsSection from './CowParentsSection';
import CowChildrenSection from './CowChildrenSection';
import CowIncidentsSection from './CowIncidentsSection';

export class CowDetailsPage extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);

    // The list of incidents will be used by the add incident modal.
    this.props.fetchIncidents();
  }

  componentDidUpdate() {
    const { cow, fetchCow, isLoading, error, match } = this.props;

    // Ensure that the new cow is fetched if the id changes in the route.
    if (!isLoading && !error && cow._id !== match.params.id) {
      fetchCow(match.params.id);
    }
  }

  render() {
    const { isLoading, error, cow, history } = this.props;

    if (error) return <div className="invalid-feedback">{error}</div>;

    if (isLoading || !cow.name) return null;

    return (
      <div>
        <CowDetails cow={cow} history={history} />
        <CowIncidentsSection cow={cow} />
        <CowParentsSection name={cow.name} mother={cow.mother} father={cow.father} />
        <CowChildrenSection name={cow.name} children={cow.children} />
      </div>
    );
  }
}

function mapStateToProps({ cowReducer: { cow, isLoading, error } }) {
  return { cow, isLoading, error };
}

export default connect(
  mapStateToProps,
  { fetchCow, fetchIncidents }
)(CowDetailsPage);
