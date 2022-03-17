import * as types from './actionTypes';

export const populateSkills = (skills) => ({
  type: types.POPULATE_SKILLS,
  payload: skills,
});

export const testAction = () => ({
  type: types.TEST,
  payload: 'test'
});