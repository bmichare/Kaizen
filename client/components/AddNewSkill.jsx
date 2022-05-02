import React from 'react';
import { connect } from 'react-redux';

import { testAction, populateSkills } from '../actions/actionCreators';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  testAction, populateSkills,
};

//Interface to add a new skill. Requires new skill input to not be null, optional inputs of goal hours & description. 
//Sends this info to back-end. Gets back updated list of skills from back-end. Updates skills state by calling populateSkills. 
const AddNewSkill = (props) => {
  function handleSubmit(e) {
    const newData = {};
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    for (const [key, value] of formData.entries()) newData[key] = value;
    fetch('/skills/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...newData}),
    })
      .then(res => res.json())
      .then(data => {
        //Check if there was an error in creating the new skill
        console.log(data)
        if(data.err) return alert(data.err);
        else props.populateSkills(data);
        e.target.reset();
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      Add New Skill
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name='skillName' placeholder='new skill' />
        <input name='goalHrs' placeholder='optional goal hours' />
        <input name='group' placeholder='optional group' />
        <textarea name='description' placeholder='optional description'/>
        <input type='submit' value='submit' />
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSkill);
