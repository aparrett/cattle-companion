import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import farmReducer from './farmReducer';
import farmsReducer from './farmsReducer';
import errorReducer from './errorReducer';
import modalReducer from './modalReducer';
import cowReducer from './cowReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  error: errorReducer,
  modal: modalReducer,
  farmReducer,
  farmsReducer,
  cowReducer
});