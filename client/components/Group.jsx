import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
});

const Group = (props) => {
  const { groupTotalMinutes } = props;
  //Deletes group
  const deleteClickHandler = (groupName) => {
    fetch(`/groups/${groupName}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(updatedGroups => {
        if(updatedGroups.err) alert(updatedGroups.err);
        props.setGroups(updatedGroups);
      })
      .catch(err => console.log(err));
  };
  const hours = `${groupTotalMinutes > 60 ? Math.floor(groupTotalMinutes / 60) : ''} ${groupTotalMinutes > 120 ? 'Hours' : 'Hour'}`;
  const minutes = `${hours ? groupTotalMinutes % 60 : groupTotalMinutes} minutes`;

  return (
    <div className='GroupComponent' >
      <span className='GroupComponentHeader'> 
        <span id='groupName'> {props.groupName} </span>
        {hours} {minutes}
        <button id='deleteGroupButton' onClick={() => deleteClickHandler(props.groupName)} >x</button>
      </span>
      
      
      {props.skillsArrForGroup}
    </div>
  );
};

export default connect(mapStateToProps, null)(Group);
