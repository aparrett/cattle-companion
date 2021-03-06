import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import farmReducer from './farmReducer';
import farmsReducer from './farmsReducer';
import errorReducer from './errorReducer';
import modalReducer from './modalReducer';
import cowReducer from './cowReducer';
import incidentsReducer from './incidentsReducer';
import eligibleParentsReducer from './eligibleParentsReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  error: errorReducer,
  modal: modalReducer,
  farmReducer,
  farmsReducer,
  cowReducer,
  incidents: incidentsReducer,
  eligibleParents: eligibleParentsReducer
});