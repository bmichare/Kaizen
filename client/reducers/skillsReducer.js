import * as types from '../actions/actionTypes';

const initialState = {
  skills: [],
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {

  case types.POPULATE_SKILLS:
    console.log('reducer reached');
    return {skills: action.payload};

  case types.TEST:
    console.log('test reducer reached');
    return state;

  default: return state;
  }
};

export default reducer;
