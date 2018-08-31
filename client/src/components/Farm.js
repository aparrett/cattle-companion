import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarm } from '../actions/farms';
import CowListItem from './CowListItem';
import { Link } from 'react-router-dom';

class Farm extends Component {
  componentDidMount() {
    this.props.fetchFarm(this.props.match.params.id);
  }

  renderCattle() {
    return this.props.farm.cattle.map(cow => <CowListItem key={cow._id} cow={cow} />);
  }

  renderFarm() {
    const { farm } = this.props;
    return(
      <div>
        <h1>{farm.name}</h1>
        {farm.cattle && <ul>{this.renderCattle()}</ul>}
        <Link to={`/farms/${farm._id}/cattle/new`}>New Cow</Link>
      </div>
    );
  }

  render() {
    return !this.props.farm || this.props.isLoading ? null : this.renderFarm();
  }
}

function mapStateToProps({ farmReducer: { farm, isLoading } }) {
  return { farm, isLoading };
}

export default connect(mapStateToProps, { fetchFarm })(Farm);