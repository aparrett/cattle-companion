import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarm } from '../actions/farms';
import { showCreateCow } from '../actions/modals';

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

  renderFarm() {
    return(
      <div>
        <h1>{this.props.farm.name}</h1>
        <button className="btn btn-primary" onClick={this.handleNewCowClick}>New Cow</button>
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

export default connect(mapStateToProps, { fetchFarm, showCreateCow })(Farm);