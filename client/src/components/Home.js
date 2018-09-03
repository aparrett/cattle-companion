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
    return this.props.farms.map(farm => (
      <li className="list-group-item" key={farm._id}>
        <Link to={`/farms/${farm._id}`}>{farm.name}</Link>
      </li>
    ));
  }

  render() {
    return (
      this.props.isLoading 
        ? null
        : <div className="mt-5">
            <h1 className="font-weight-bold">Farms</h1>
            <ul className="list-group mt-4">
              { this.renderFarms() }
            </ul>
            <div className="mt-4">
              <FarmCreateForm />
            </div>
          </div>
    );
  }
}

function mapStateToProps({ farmsReducer: { farms, isLoading } }) {
  return { farms, isLoading };
}

export default connect(mapStateToProps, { fetchFarms })(Home);
