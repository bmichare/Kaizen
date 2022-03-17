import React from 'react';
import { connect } from 'react-redux';

import { testAction } from '../actions/actionCreators';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  testAction,
};

// const mapDispatchToProps = (dispatch) => ({
//   testAction: () => dispatch(testAction()),
// });

const AddNewSkill = (props) => {
  function handleSubmit(e) {
    const newData = {}
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    // console.log(newData)
    for (const [key, value] of formData.entries()) newData[key] = value
    // console.log(newData)
    // props.testAction();
    fetch('/skills/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...newData}),
    })
      // .then(res => res.json())
      // .then(data => {
      //   console.log(data)
      //   // props.populateSkills(data);
      // })
      // fetch('/skills/')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // props.populateSkills(data);
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      Add New Skill
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name='skillName' placeholder='new skill' />
        <input name='goalHrs' placeholder='optional goal hours' />
        <textarea name='description' placeholder='optional description'/>
        <input type='submit' value='submit' />
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewSkill);
