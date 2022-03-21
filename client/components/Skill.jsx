import React from 'react';
import { connect } from 'react-redux';

import Subskill from './Subskill';
import Log from './Log';
import AddLogDetails from './AddLogDetails';
import { deleteSkill, activateAddLogDetails } from '../actions/actionCreators';

const mapStateToProps = (state) => ({
  skills: state.skills.skills,
});

const mapDispatchToProps = {
  deleteSkill, activateAddLogDetails,
};

// {skillName: {skillName, goalHrs, description, log: [{date, log desc, log title}] }}

//Creates the Skill components
const Skill = (props) => {
  const { skillName, goalHrs, description, totalMinutes } = props.skills[props.skillName];

  //Called through delete button. Sends request to back-end to delete skill indentified using skillName as a param.
  //If successful, receives entire deleted skill object back. Then proceeds to dispatch deleteSkill action passing in the deleted skillName
  const deleteClickHandler = (skillName) => {
    fetch(`/skills/${skillName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if(data.err) alert(data.err);
        props.deleteSkill(data.skillName);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='Skill'>
      {skillName} {`Goal: ${goalHrs}`} {`Desc: ${description}`} {`Time Practiced: ${Math.floor(totalMinutes / 60)} hours ${totalMinutes % 60} minutes`}
      <Subskill />
      <button id='deleteButton' onClick={() => deleteClickHandler(skillName)}>delete</button>
      <button id='addLogButton'onClick={() => props.activateAddLogDetails(skillName)}>Add Log</button>
      <button id='viewLogsButton'>View Logs</button>
      <AddLogDetails skillName={skillName}/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Skill);
