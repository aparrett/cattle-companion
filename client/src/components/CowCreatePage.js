import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import InputField from './fields/InputField';
import VerticalRadioField from './fields/VerticalRadioField';
import MotherSelect from './fields/MotherSelect';
import FatherSelect from './fields/FatherSelect';
import { CowGenders } from '../enums';
import { saveCow } from '../actions/cattle';

class CowCreatePage extends Component {
  handleFormSubmit(formProps) {
    const { match, saveCow, history} = this.props;
    const cow = { ...formProps, farm: match.params.farmId };
    saveCow(cow, history);
  }
  
  render() {
    const { handleSubmit, match } = this.props;

    return (
      <div>
        <h1>New Cow</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="name" type="text" label="Name" className="form-control" component={InputField} />
          <div className="mb-3">
            <label>Gender</label>
            <Field name="gender" component={VerticalRadioField} label="Cow" radioValue={CowGenders.Cow} ignoreError="true" />
            <Field name="gender" component={VerticalRadioField} label="Bull" radioValue={CowGenders.Bull} />
          </div>
          <Field name="dateOfBirth" label="Date of Birth" type="date" className="form-control" component={InputField} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
          <Field name="mother" label="Mother" type="text" farmId={match.params.farmId} className="form-control" component={MotherSelect} />
          <Field name="father" label="Father" type="text" farmId={match.params.farmId} className="form-control" component={FatherSelect} />
          <button type="submit" className="btn btn-primary">Save Cow</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please enter a name.';
  }

  if (values.name && values.name.length > 100) {
    errors.name = 'Name cannot be longer than 100 characters.';
  }

  if (!values.gender) {
    errors.gender = 'Gender is required.';
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.';
  }

  return errors;
}

CowCreatePage = reduxForm({
  form: 'cowCreateForm',
  validate
})(CowCreatePage);

export default withRouter(connect(null, { saveCow })(CowCreatePage));