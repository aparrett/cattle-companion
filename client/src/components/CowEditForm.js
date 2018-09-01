import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import InputField from './fields/InputField';
import { CowGenders } from '../enums';
import { fetchCow, editCow } from '../actions/cattle';
import MotherSelect from './fields/MotherSelect'
import FatherSelect from './fields/FatherSelect';
import moment from 'moment';

class CowEditForm extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);
  }

  handleFormSubmit(formProps) {
    const { match: { params: { id, farmId } }, editCow, history} = this.props;
    const cow = { ...formProps, _id: id, farmId: farmId };
    editCow(cow, history);
  }
  
  render() {
    const { handleSubmit, match } = this.props;

    return (
      <div>
        <h1>Edit Cow</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="name" type="text" label="Name" className="form-control" component={InputField} />
          <label>
            <Field name="gender" type="radio" className="form-control" component={InputField} value={CowGenders.Cow} />Cow
          </label>
          <label>
            <Field name="gender" type="radio" ignoreError="true" className="form-control" component={InputField} value={CowGenders.Bull} />Bull
          </label>
          <Field name="dateOfBirth" label="Date of Birth" type="date" className="form-control" component={InputField} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
          <Field name="mother" label="Mother" type="text" cowId={match.params.id} className="form-control" component={MotherSelect} />
          <Field name="father" label="Father" type="text" cowId={match.params.id} className="form-control" component={FatherSelect} />
          <button type="submit" className="btn btn-primary">Save</button>
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

CowEditForm = reduxForm({
  form: 'cowEditForm',
  validate,
  enableReinitialize: true
})(CowEditForm);

function mapStateToProps({ cowReducer: { cow } }) {
  cow.dateOfBirth = moment(cow.dateOfBirth).format('YYYY-MM-DD');
  return { initialValues: cow }
}

export default withRouter(connect(mapStateToProps, { fetchCow, editCow })(CowEditForm));