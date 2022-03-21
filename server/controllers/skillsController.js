const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../../data/skills.json');
const skillsController = {};

//DATA FORMAT: {skillName: {skillName, goalHrs, description, logs: [{date, log desc, log title}] }}

//receive data in string form, pass it onto front-end in JSON form
skillsController.getSkills = (req, res, next) => {
  fs.readFile(dataPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.getSkills ${err}`,
      message: { err: 'error in skillsController.getSkills' },
    });

    res.locals.skillsData = JSON.parse(data);
    return next();
  });
};

//creates new skill by first reading in that data from data folder
skillsController.createSkill = (req, res, next) => {
  fs.readFile(dataPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.getSkills ${err}`,
      message: { err: 'error in skillsController.getSkills' },
    });

    data = JSON.parse(data);
    const { skillName, goalHrs, description } = req.body;

    //ensure skill isn't a duplicate
    if(data[skillName]) return next({
      log: 'error in skillsController.createSkill: skill already exists',
      message: {err: 'Error: This skill already exists'},
    });

    //ensure skillName is not empty
    if(!skillName) return next({
      log: 'error in skillsController.createSkill: skillName cannot be empty',
      message: {err: 'Error: Skill name cannot be empty'},
    });

    //Add new skill & info to data object. Write updated data to database. 
    //Sends data for the updated list of skills to front-end
    data[skillName] = { skillName, goalHrs, description, totalMinutes: 0, logs: [] };

    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
      if(err) return next({
        log: `error in skillsController.createSkill ${err}`,
        message: { err: 'error in skillsController.createSkill' },
      });

      res.locals.newSkills = data;
      return next();
    });
  });
};

//Receives skillName as a param. Deletes skill from database using skillName as identifier
//Sends back the deleted skill 
skillsController.deleteSkill = (req, res, next) => {
  fs.readFile(dataPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.deleteSkill ${err}`,
      message: { err: 'Error when attemping to delete.' },
    });

    data = JSON.parse(data);
    res.locals.deletedSkill = data[req.params.skillName];
    delete data[req.params.skillName];

    fs.writeFile(dataPath, JSON.stringify(data), (err, data) => {
      if(err) return next({
        log: `error in skillsController.deleteSkill ${err}`,
        message: { err: 'Error when attemping to delete.' },
      });

      return next();
    });
  });
};

//Receives new log data and writes it to db. 
skillsController.postLog = (req, res, next) => {
  const { date, hours, minutes, notes, skillName } = req.body;
  const newLog = { date, hours, minutes, notes }

  //If hours & minutes are both 0, return error to front-end
  if(hours == 0 && minutes == 0) return next({
    log: 'error in skillsController.postLog: both hours and minutes cannot be zero',
    message: { err: 'Both hours and minutes cannot be zero.' },
  }); 

  //Take current data file and push the new log to the proper skill's log array
  fs.readFile(dataPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.postLog ${err}`,
      message: { err: 'Error when attemping to post Log.' },
    });

    data = JSON.parse(data);
    data[skillName].logs.push(newLog);

    //Convert hours and minutes to minutes only. Add this number to totalMinutes practiced
    const minutesPracticed = hours * 60 + minutes;
    data[skillName].totalMinutes += minutesPracticed;
    console.log(data[skillName])
    fs.writeFile(dataPath, JSON.stringify(data), (err, data) => {
      if(err) return next({
        log: `error in skillsController.postLog ${err}`,
        message: { err: 'Error when attemping to post log.' },
      });

      res.locals.postedLog = newLog;
      
      return next();
    });
  });
};

module.exports = skillsController;
