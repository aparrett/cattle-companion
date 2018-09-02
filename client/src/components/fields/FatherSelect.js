import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEligibleFathers, fetchEligibleFathersByFarm } from '../../actions/cattle';

class FatherSelect extends Component {
  componentDidMount() {
    const { cowId, farmId, fetchEligibleFathersByFarm, fetchEligibleFathers } = this.props;

    if (!cowId) {
      fetchEligibleFathersByFarm(farmId);
    } else {
      fetchEligibleFathers(cowId);
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
    const { eligibleFathers, label, input } = this.props;
    return (
      <div className="form-group">
        <label>{label}</label>
        { eligibleFathers.length > 0 
          ? 
            <select className="form-control" {...input}>
              <option value="">Select...</option>
              {this.renderFatherOptions(eligibleFathers)}
            </select>
          :
            <p>There are no eligible fathers for this cow.</p>
        }
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