import userReducer from 'reducers/user';
import { combineReducers } from 'redux';

module.exports = combineReducers({
  users: userReducer,
});
