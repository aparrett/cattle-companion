import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFarms } from '../actions/farms';
import CreateFarm from './CreateFarm';

class Home extends Component {
  componentDidMount() {
    this.props.fetchFarms();
  }

  renderFarms() {
    return this.props.farms.map(farm => {
      return (
      <li key={farm._id}>
        <Link to={`/farms/${farm._id}`}>{farm.name}</Link>
      </li>
      );
    });
  }

  render() {
    return(
      <div>
        <ul>
          { this.renderFarms() }
        </ul>
        <CreateFarm />
      </div>
    );
  }
}

function mapStateToProps({ farms }) {
  return { farms };
}

export default connect(mapStateToProps, { fetchFarms })(Home);
