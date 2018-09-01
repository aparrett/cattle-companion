import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEligibleFathers, fetchEligibleFathersByFarm } from '../../actions/cattle';

class FatherSelect extends Component {
  componentDidMount() {
    const { cowId, farmId } = this.props;

    if (!cowId) {
      this.props.fetchEligibleFathersByFarm(farmId);
    } else {
      this.props.fetchEligibleFathers(cowId);
    }
  }

  renderFatherOptions(eligibleFathers){
    return eligibleFathers
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
          {this.renderFatherOptions(this.props.eligibleFathers)}
        </select>
      </div>
    );
  }
}

const mapStateToProps = ({ eligibleParents: { eligibleFathers } }) => ({ 
  eligibleFathers 
});

export default connect(mapStateToProps, { 
  fetchEligibleFathers, fetchEligibleFathersByFarm 
})(FatherSelect);