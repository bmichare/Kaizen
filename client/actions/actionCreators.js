import * as types from './actionTypes';

export const populateSkills = (skills) => ({
  type: types.POPULATE_SKILLS,
  payload: skills,
});

export const deleteSkill = (deletedSkill) => ({
  type: types.DELETE_SKILL,
  payload: deletedSkill,
});

export const activateAddLogDetails = (skillName) => ({
  type: types.ACTIVATE_ADD_LOG_DETAILS,
  payload: skillName,
})

export const testAction = () => ({
  type: types.TEST,
  payload: 'test'
});