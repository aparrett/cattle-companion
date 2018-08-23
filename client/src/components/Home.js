import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarms } from '../actions/farms';
import CreateFarm from './CreateFarm';

class Home extends Component {
  componentDidMount() {
    this.props.fetchFarms();
  }

  renderFarms() {
    return (
      <ul>
        { this.props.farms.map(farm => <li key={farm._id}>{farm.name}</li>) }
      </ul>
    );
  }

  render() {
    return(
      <div>
        { this.renderFarms() }
        <CreateFarm />
      </div>
    );
  }
}

function mapStateToProps({ farms }) {
  return { farms };
}

export default connect(mapStateToProps, { fetchFarms })(Home);
