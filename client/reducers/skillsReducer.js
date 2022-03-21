import * as types from '../actions/actionTypes';

const initialState = {
  skills: {},
  activeAddLogDetails: {},
};


// {skillName: {skillName, goalHrs, description, log: [{date, log desc, log title}] }}
const reducer = (state = initialState, action) => {
  const newState = { 
    ...state,
    skills: {...state.skills},
    activeAddLogDetails: {...state.activeAddLogDetails} 
  };

  switch (action.type) {

  //Populates skills in state with the result from GET request to retrieve stored skills
  case types.POPULATE_SKILLS:
    newState.skills = action.payload;
    return newState;

  case types.DELETE_SKILL:
    delete newState.skills[action.payload];
    return newState;

  //Toggles whether or not the addLogDetails component should show. 
  case types.ACTIVATE_ADD_LOG_DETAILS:
    if(!newState.activeAddLogDetails[action.payload]) newState.activeAddLogDetails[action.payload] = true;
    else delete newState.activeAddLogDetails[action.payload];
    return newState;

  case types.TEST:
    console.log('test reducer reached');
    return state;

  default: return state;
  }
};

export default reducer;
