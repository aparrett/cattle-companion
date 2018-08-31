import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarm } from '../actions/farms';
import { showCreateCow } from '../actions/modals';
import CowListItem from './CowListItem';

class Farm extends Component {
  constructor() {
    super();
    this.handleNewCowClick = this.handleNewCowClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchFarm(this.props.match.params.id);
  }

  handleNewCowClick() {
    this.props.showCreateCow(this.props.match.params.id);
  }

  renderCattle() {
    return this.props.farm.cattle.map(cow => <CowListItem cow={cow} />);
  }

  renderFarm() {
    return(
      <div>
        <h1>{this.props.farm.name}</h1>
        {this.props.farm.cattle && <ul>{this.renderCattle()}</ul>}
        <button className="btn btn-primary" onClick={this.handleNewCowClick}>New Cow</button>
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

export default connect(mapStateToProps, { fetchFarm, showCreateCow })(Farm);