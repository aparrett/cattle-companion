import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarms } from '../actions/farms';
import FarmCreateForm from './FarmCreateForm';
import FarmListItem from './FarmListItem';

class HomePage extends Component {
  componentDidMount() {
    this.props.fetchFarms();
  }

  render() {
    return (
      this.props.isLoading 
        ? null
        : <div className="mt-5">
            <h1 className="font-weight-bold">Farms</h1>
            <ul className="list-group mt-4">
              { this.props.farms.map(farm => <FarmListItem farm={farm} key={farm._id} />) }
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

export default connect(mapStateToProps, { fetchFarms })(HomePage);
