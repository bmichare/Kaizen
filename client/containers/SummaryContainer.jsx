import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { populateSkills, testAction } from '../actions/actionCreators';
import Skill from '../components/Skill';
import Group from '../components/Group';

const mapStateToProps = (state) => ({
  skills: state.skills.skills,
});

const mapDispatchToProps = {
  populateSkills, testAction,
};


// {skillName: {skillName, goalHrs, description, log: [{date, log desc, log title}] }}

const SummaryContainer = (props) => {
  const [groups, setGroups] = useState({});
  //on component mount, request existing skills data from backend
  useEffect(() => {
    fetch('/skills/')
      .then(res => res.json())
      .then(data => {
        setGroups(data.groups)
        props.populateSkills(data);
      })
      .catch(err => console.log(err));
  }, []);

  //Runs when Add New Group button is pressed.
  //Sends {'groupName': groupName} to backend to be added to skillsDB
  const addGroupHandler = (e) => {
    localStorage.setItem('test', JSON.stringify([1,2,3]));
    // const newGroup = {};
    // const formData = new FormData(e.currentTarget);
    // e.preventDefault();
    // for (const [key, value] of formData.entries()) {
    //   newGroup[key] = value; 
    // }
    // fetch('/groups/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({...newGroup}),
    // })
    //   .then(res => res.json())
    //   .then(groups => {
    //     //Check if there was an error in creating the new group
    //     if(groups.err) return alert(groups.err);
    //     setGroups(groups);
    //     e.target.reset();
    //   })
    //   .catch(err => console.log(err));
  };

  //groupsArr contains the group components
  //skillsObj
  const groupsArr = [];
  const skillsObj = {...props.skills};

  //Populates groupsArr with the group components. Runs only if groups state is not empty
  if(Object.keys(groups).length) {
    for(const group in groups) {
      const skillsArrForGroup = [];
      let groupTotalMinutes = 0;
      for(const skill in skillsObj) {
        if(skillsObj[skill].group === group) {
          groupTotalMinutes += skillsObj[skill].totalMinutes;
          skillsArrForGroup.push(<Skill key={skill} skillName={props.skills[skill].skillName} groups={groups} currentGroup={group} />);
          delete skillsObj[skill];
        } 
      }
      groupsArr.push(<Group groupName={group} setGroups={setGroups} key={`group:${group}`} skillsArrForGroup={skillsArrForGroup} groupTotalMinutes={groupTotalMinutes} />);
    }
  }

  //This contains all the remaining skills not belonging to any groups
  const nonGroupedSkillsArr = [];
  for(const key in skillsObj) {
    nonGroupedSkillsArr.push(<Skill key={key} skillName={props.skills[key].skillName} groups={groups} currentGroup='Select Group' />);
  }
  
  return (
    <>
      <div className='groupsContainer' >
        <form id='addGroup' onSubmit={e => addGroupHandler(e)} >
          <input name='groupName' type='text' placeholder='Group Name' />
          <input type='submit' value='Add New Group' />
        </form>
        {groupsArr}
      </div>
      <div  className='skillsContainer'>
        {nonGroupedSkillsArr}
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryContainer);
