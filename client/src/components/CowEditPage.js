import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import moment from 'moment';
import { CowGenders } from '../enums';
import { fetchCow, editCow } from '../actions/cattle';
import InputField from './fields/InputField';
import VerticalRadioField from './fields/VerticalRadioField';
import MotherSelect from './fields/MotherSelect';
import FatherSelect from './fields/FatherSelect';
import validate from '../validation/validateCow';
import { mergeProps } from '../utils/redux';

class CowEditPage extends Component {
  componentDidMount() {
    this.props.fetchCow(this.props.match.params.id);
  }

  handleFormSubmit(formProps) {
    const {
      match: {
        params: { id, farmId }
      },
      editCow,
      history
    } = this.props;

    const cow = {
      ...formProps,
      _id: id,
      farm: farmId,
      mother: !formProps.mother || formProps.mother === '' ? null : formProps.mother,
      father: !formProps.father || formProps.father === '' ? null : formProps.father
    };

    editCow(cow, history);
  }

  render() {
    const { handleSubmit, match } = this.props;

    return (
      <div>
        <h1>Edit Cow</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field
            name="name"
            type="text"
            label="Name"
            className="form-control"
            component={InputField}
          />
          <div className="mb-3">
            <label>Gender</label>
            <Field
              name="gender"
              component={VerticalRadioField}
              label="Cow"
              radioValue={CowGenders.Cow}
              ignoreError="true"
            />
            <Field
              name="gender"
              component={VerticalRadioField}
              label="Bull"
              radioValue={CowGenders.Bull}
            />
          </div>
          <Field
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            className="form-control"
            component={InputField}
            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
          />
          <Field
            name="mother"
            label="Mother"
            type="text"
            cowId={match.params.id}
            className="form-control"
            component={MotherSelect}
          />
          <Field
            name="father"
            label="Father"
            type="text"
            cowId={match.params.id}
            className="form-control"
            component={FatherSelect}
          />
          <button className="btn btn-gray mr-2" onClick={(e) => {
            e.preventDefault();
            this.props.history.goBack();
          }}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

CowEditPage = reduxForm({
  form: 'cowEditForm',
  validate,
  enableReinitialize: true
})(CowEditPage);

function mapStateToProps({ cowReducer: { cow } }) {
  const initialValues = {
    ...cow,
    dateOfBirth: moment(cow.dateOfBirth).format('YYYY-MM-DD')
  };

  if (cow.mother) {
    initialValues.mother = cow.mother._id;
  }

  if (cow.father) {
    initialValues.father = cow.father._id;
  }

  return { initialValues };
}

export const ConnectedCowEditPage = connect(
  mapStateToProps,
  { fetchCow, editCow },
  mergeProps
)(CowEditPage);

export default withRouter(ConnectedCowEditPage);
