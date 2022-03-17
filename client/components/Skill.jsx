import React from 'react';
import { connect } from 'react-redux';

import Subskill from './Subskill';

const mapStateToProps = (state) => ({
  skills: state.skills.skills,
});

// {skillName: {skillName, goalHrs, description, log: [{date, log desc, log title}] }}

const Skill = (props) => {
  return (
    <div>
      {props.skillName}
      <Subskill />
    </div>
  );
};

export default connect(mapStateToProps, null)(Skill);
