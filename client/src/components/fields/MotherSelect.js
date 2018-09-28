import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEligibleMothers, fetchEligibleMothersByFarm } from '../../actions/cattle';

class MotherSelect extends Component {
  componentDidMount() {
    const { cowId, farmId, fetchEligibleMothersByFarm, fetchEligibleMothers } = this.props;

    if (!cowId) {
      fetchEligibleMothersByFarm(farmId);
    } else {
      fetchEligibleMothers(cowId);
    }
  }

  renderMotherOptions(eligibleMothers) {
    return eligibleMothers
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .map(cow => (
        <option key={cow._id} value={cow._id}>
          {cow.name}
        </option>
      ));
  }

  render() {
    const { eligibleMothers, input, label } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        <select className="form-control" {...input}>
          <option value="">None</option>
          {this.renderMotherOptions(eligibleMothers)}
        </select>
        {eligibleMothers.length === 0 && (
          <p className="mt-1">There are no eligible mothers for this cow.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ eligibleParents: { eligibleMothers } }) => ({
  eligibleMothers
});

export default connect(
  mapStateToProps,
  {
    fetchEligibleMothers,
    fetchEligibleMothersByFarm
  }
)(MotherSelect);
