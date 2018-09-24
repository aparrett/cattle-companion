import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarm } from '../actions/farms';
import CowListItem from './CowListItem';
import { Link } from 'react-router-dom';

class FarmDetailsPage extends Component {
  componentDidMount() {
    this.props.fetchFarm(this.props.match.params.id);
  }

  renderCattle() {
    return this.props.farm.cattle.map(cow => <CowListItem key={cow._id} cow={cow} />);
  }

  render() {
    if (!this.props.farm || this.props.isLoading) return null; 
    
    const { farm } = this.props;

    return (
      <div>
        <h1>{farm.name}</h1>
        {farm.cattle && <ul className="list-group mt-4">{this.renderCattle()}</ul>}
        <Link to={`/farms/${farm._id}/cattle/new`}>
          <button className="btn btn-outline-primary mt-3">New Cow</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ farmReducer: { farm, isLoading } }) {
  return { farm, isLoading };
}

export default connect(mapStateToProps, { fetchFarm })(FarmDetailsPage);