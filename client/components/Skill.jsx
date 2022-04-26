import React, { useState } from 'react';
import { connect } from 'react-redux';

import SkillDetails from './SkillDetails';
import Log from './Log';
import AddLogDetails from './AddLogDetails';
import { deleteSkill, activateAddLogDetails, populateSkills } from '../actions/actionCreators';

const mapStateToProps = (state) => ({
  skills: state.skills.skills,
  activeAddLogDetails: state.skills.activeAddLogDetails,
});

const mapDispatchToProps = {
  deleteSkill, populateSkills,
};

// {skillName: {skillName, goalHrs, description, log: [{date, log desc, log title}] }}

//Creates the Skill components
const Skill = (props) => {
  const { skillName, goalHrs, description, totalMinutes } = props.skills[props.skillName];
  const [ logs, setLogs ] = useState([]);
  const [ showLogs, setShowLogs ] = useState(false);
  const [ showSkillDetails, setShowSkillDetails ] = useState(false);

  //Called through delete button. Sends request to back-end to delete skill indentified using skillName as a param.
  //If successful, receives entire deleted skill object back. Then proceeds to dispatch deleteSkill action passing in the deleted skillName
  const deleteSkillClickHandler = (skillName) => {
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

  const viewSkillDetailsClickHandler = () => {
    setShowSkillDetails(showSkillDetails === false ? true : false);
  };

  const changeGroupSelectHandler = (e) => {
    fetch('/skills/group', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({newGroup: e.target.value, skillName})
    })
      .then(res => res.json())
      .then(data => {
        if(data.err) alert(data.err);
        props.populateSkills(data);
      })
      .catch(err => console.log(err));
  };

  //Ensures that logs are only fetched once
  //Also toggles whether logs should show.  
  let haveLogsBeenFetched = false;
  const viewLogsClickHandler = () => {
    if(!haveLogsBeenFetched) {    
      fetch(`/skills/logs/${skillName}`)
        .then(res => res.json())
        .then(data => {
          setLogs(data);
          haveLogsBeenFetched = true;
          showLogs === true ? setShowLogs(false) : setShowLogs(true);
        })
        .catch(err => console.log(err));
    }
    showLogs === true ? setShowLogs(false) : setShowLogs(true);
  };

  const deleteLogClickHandler = (logIndex) => {
    fetch(`/skills/logs/${skillName}/${logIndex}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(deletedIndex => {
        const newLogs = [...logs];
        newLogs.splice(deletedIndex, 1);
        setLogs(newLogs);
      })
      .catch(err => console.log(err));
  };

  //The logs shown when view logs is pressed.
  let logsArr = [];
  if(logs.length && showLogs) for(let i = 0; i < logs.length; i++) {
    logsArr.push(<Log key={`log-${skillName}-${i}`} logs={logs} logIndex={i} deleteLogClickHandler={deleteLogClickHandler} />);
  } else logsArr = [];

  return (
    <div className='SkillComponent'>
      <div className='skillsContainer' >
        <div id='skillName' >{skillName} {' '}</div>
        <div> 
          {`Goal: ${goalHrs}`} 
          {`Time Practiced: ${Math.floor(totalMinutes / 60)} ${Math.floor(totalMinutes / 60) === 1 ? 'hour' : 'hours'} ${totalMinutes % 60} ${totalMinutes % 60 === 1 ? 'minute' : 'minutes'}`}
        </div>
        <button id='viewSkillDetailsButton' onClick={viewSkillDetailsClickHandler}>details</button>
      </div>
      {showSkillDetails ? <SkillDetails skillName={skillName} groups={props.groups} changeGroupSelectHandler={changeGroupSelectHandler} viewLogsClickHandler={viewLogsClickHandler} deleteSkillClickHandler={deleteSkillClickHandler} /> : null}
      {props.activeAddLogDetails[skillName] && showSkillDetails ? <AddLogDetails skillName={skillName}/> : null}
  
      {logsArr}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Skill);
