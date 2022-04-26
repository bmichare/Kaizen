import React, { useState } from 'react';
import { connect } from 'react-redux';

import { populateSkills } from '../actions/actionCreators';

//Converts time (04:15) to workable float in hrs (4.25) 
// const timeToFloat = (time) => {
//   const hoursMinutes = time.split(/[.:]/);
//   const hours = parseInt(hoursMinutes[0], 10);
//   const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
//   return hours + minutes / 60; 
// };

// const floatToTime = (float) => {
//   const hourMinutes = float.toString().split(/[.:]/);
//   let hour = hourMinutes[0];
//   if(hour > 24) hour = hour - Math.floor(hour/24)*24
//   hour = hour.toString()
//   if(hour.length === 1) hour = `0${hour}`;
//   let minutes = hourMinutes[1] ? parseInt(hourMinutes[1] * 60 / 10) : '00' ;
//   minutes = minutes.toString().substring(0,2)
//   return `${hour}:${minutes}`;
// };

const mapStateToProps = (state) => ({
  activeAddLogDetails: state.skills.activeAddLogDetails,
  skills: state.skills.skills
});

const mapDispatchToProps = {
  populateSkills,
};

const AddLogDetails = (props) => {
  // const [startTime, setStartTime] = useState();
  // const [endTime, setEndTime] = useState();
  // const [hours, setHours] = useState(0);

  //Takes new log form data and converts to object. Sends it to back-end to create new log
  //Note that hours and minutes are converted from string to integers
  const formSubmitHandler = (e) => {
    const logDetails = {};
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    for(const [key, value] of formData.entries()) logDetails[key] = value;
    logDetails.hours = parseInt(logDetails.hours);
    logDetails.minutes = parseInt(logDetails.minutes);
    logDetails.skillName = props.skillName;

    fetch('/skills/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logDetails),
    })
      .then(res => res.json())
      .then(data => {
        if(data.err) alert(data.err);
        props.populateSkills(data.newSkills);
        console.log('log successfully posted:', data);
        e.target.reset();
      })
      .catch(err => console.log(err));
  };

  // const inputChangeHandler = (e) => {
  // if(e.target.name === 'startTime') setStartTime(e.target.value);
  // //Automatically calculates hours by subtracting startTime from endTime if hours is inputted while startTime is not undefined
  // else if(e.target.name === 'endTime') {
  //   if(startTime) setHours((timeToFloat(e.target.value) - timeToFloat(startTime)).toFixed(2));
  //   setEndTime(e.target.value);
  // }
  // else if(e.target.name === 'hours') {
  // //Automatically calculates endTime if hours is inputted while startTime is not undefined 
  // if(startTime) setEndTime(floatToTime(timeToFloat(startTime) + parseFloat(e.target.value)));
  // setHours(e.target.value);
  // }
  // };

  //Creates the current date in proper string format to be used as the default value of date input
  const currentDate = new Date().toLocaleDateString('en-US')
  const formattedDate = new Date(currentDate).toISOString().split('T')[0]

  // if(props.activeAddLogDetails[props.skillName])
  return (
    <form className='AddLogDetailsComponent' onSubmit={formSubmitHandler} >

      {/* <label>
        Start Time:
        <input name='startTime' type='time' value={startTime} onChange={inputChangeHandler} />
      </label>
      <label>
        End Time:
        <input name='endTime' type='time' value={endTime} onChange={inputChangeHandler} />
      </label> */}
      <div className='addLogDetailsContainer' >
        <label>
          Date
          <input name='date' type='date' defaultValue={formattedDate} />
        </label>
        <label>
          Hours:
          <input name='hours' type='number' min={0} step={1} defaultValue={0} /* value={hours}  onChange={inputChangeHandler} */ />
        </label>
        <label>
          Minutes:
          <input name='minutes' type='number' min={0} step={1} defaultValue={0} />
        </label>
        <br />
      </div>
      <label> 
        Notes 
        <textarea name='notes' type='text' /> 
      </label>
        
      <input type='submit' value='submit' />
    </form>                    
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLogDetails);
