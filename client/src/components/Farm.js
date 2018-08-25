import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarm } from '../actions/farms.js';

class Farm extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchFarm(id);
  }

  renderFarm() {
    return(
      <div>
        <h1>{this.props.farm.name}</h1>
      </div>
    );
  }

  render() {
    return this.props.farm ? this.renderFarm() : <div>Loading...</div>;
  }
}

function mapStateToProps({ farm }) {
  return { farm };
}

export default connect(mapStateToProps, { fetchFarm })(Farm);