import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { populateSkills, testAction } from '../actions/actionCreators';
import Skill from '../components/Skill';

const mapStateToProps = (state) => ({
  skills: state.skills.skills,
});

const mapDispatchToProps = {
  populateSkills, testAction,
};


// {skillName: {skillName, goalHrs, description, log: [{date, log desc, log title}] }}

const SummaryContainer = (props) => {
//on load-up, request existing skills data from backend
  useEffect(() => {
    fetch('/skills/')
      .then(res => res.json())
      .then(data => {
        props.populateSkills(data);
      })
      .catch(err => console.log(err));
  }, []);

  const skills = [];
  for(const key in props.skills) {
    skills.push(<Skill key={key} skillName={props.skills[key].skillName} />);
  }

  return (
    <div  className='skillsContainer'>
      {skills}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryContainer);
