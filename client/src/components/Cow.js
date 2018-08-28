import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCow } from '../actions/cattle';

class Cow extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        { this.props.isLoading ? null : this.props.cow.name }
      </div>
    );
  }
}

function mapStateToProps({ cowReducer: { cow, isLoading } }) {
  return { cow, isLoading };
}
export default connect(mapStateToProps, { fetchCow })(Cow);
