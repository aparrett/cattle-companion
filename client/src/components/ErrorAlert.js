import React from 'react';
import { dismissError } from '../actions/error';
import { connect } from 'react-redux';

const ErrorAlert = ({ error, dismissError }) => {
  if (!error) return null;

  setTimeout(() => dismissError(), 5 * 1000);

  return (
    <div>
      <div className="alert alert-secondary">
        {error}
        <button type="button" className="close" onClick={() => dismissError()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

function mapStateToProps({ error }) {
  return { error };
}

export default connect(
  mapStateToProps,
  { dismissError }
)(ErrorAlert);
