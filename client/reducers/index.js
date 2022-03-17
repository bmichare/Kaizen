import { combineReducers } from 'redux';

import skillsReducer from './skillsReducer.js';

const reducers = combineReducers({
  skills: skillsReducer,
});

export default reducers;
