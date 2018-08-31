import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFarms } from '../actions/farms';
import FarmCreateForm from './FarmCreateForm';

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
    return (
      this.props.isLoading 
        ? null
        : <div>
            <ul>
              { this.renderFarms() }
            </ul>
            <FarmCreateForm />
          </div>
    );
  }
}

function mapStateToProps({ farmsReducer: { farms, isLoading } }) {
  return { farms, isLoading };
}

export default connect(mapStateToProps, { fetchFarms })(Home);
