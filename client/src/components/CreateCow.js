import React from 'react';
import CowForm from './CowForm';
import { saveCow } from '../actions/cattle';
import { connect } from 'react-redux';

const CreateCow = ({ saveCow, match }) => {
  return (
    <div>
      <h1>Create Cow</h1>
      <CowForm action={saveCow} farmId={match.params.farmId} />
    </div>
  );
};

export default connect(null, { saveCow })(CreateCow);