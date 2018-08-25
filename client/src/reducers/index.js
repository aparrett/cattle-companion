import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import farmReducer from './farmReducer';
import farmsReducer from './farmsReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  farms: farmsReducer,
  error: errorReducer,
  farm: farmReducer
});