import React from 'react';
import { connect } from 'react-redux';

import { activateAddLogDetails } from '../actions/actionCreators';
import Log from './Log';

const mapDispatchToProps = {
  activateAddLogDetails,
};

const mapStateToProps = (state) => ({
});

const SkillDetails = (props) => {
  const { skillName } = props;

  const groupOptionsArr = [];
  groupOptionsArr.push(<option value='' key='option-' >-</option>);
  for(const group in props.groups) {
    groupOptionsArr.push(<option value={group} key={`option${group}`} > {group} </option>);
  }

  return (
    <div className='skillDetailsComponent'>
      <select id='changeGroupSelect' onChange={(e) => props.changeGroupSelectHandler(e)} defaultValue={props.currentGroup} >
        {groupOptionsArr}
      </select>
      <button id='addLogButton'onClick={() => props.activateAddLogDetails(skillName)}>Add Log</button>
      <button id='deleteSkillButton' onClick={() => props.deleteSkillClickHandler(skillName)}>delete</button>
      <button id='viewLogsButton' onClick={props.viewLogsClickHandler} >View Logs</button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillDetails);
