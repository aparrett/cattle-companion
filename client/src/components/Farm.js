import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFarm } from '../actions/farms';
import { showCreateCow } from '../actions/modals';
import { Link } from 'react-router-dom';

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
    const farmId = this.props.match.params.id;

    return this.props.farm.cattle.map(cow => {
      return(
        <li key={cow._id}>
          <p><Link to={`/farms/${farmId}/${cow._id}`}>Name: {cow.name}</Link></p>
          <p>Gender: {cow.gender}</p>
          <p>Date of Birth: {cow.dateOfBirth}</p>
        </li>
      );
    });
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