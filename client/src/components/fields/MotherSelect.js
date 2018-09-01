import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEligibleMothers, fetchEligibleMothersByFarm } from '../../actions/cattle';

class MotherSelect extends Component {
  componentDidMount() {
    const { cowId, farmId } = this.props;

    if (!cowId) {
      this.props.fetchEligibleMothersByFarm(farmId);
    } else {
      this.props.fetchEligibleMothers(cowId);
    }
  }

  renderMotherOptions(eligibleMothers){
    return eligibleMothers
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
      .map(cow => (
        <option key={cow._id} value={cow._id}>{cow.name}</option>
      ));
  }

  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <select className="form-control" {...this.props.input}>
          <option value="">Select...</option>
          {this.renderMotherOptions(this.props.eligibleMothers)}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ eligibleParents: { eligibleMothers } }) => ({ 
  eligibleMothers 
});

export default connect(mapStateToProps, { 
  fetchEligibleMothers, fetchEligibleMothersByFarm 
})(MotherSelect);