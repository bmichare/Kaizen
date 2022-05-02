const fs = require('fs');
const path = require('path');

const skillsPath = path.resolve(__dirname, '../../data/skills.json');
const logsPath = path.resolve(__dirname, '../../data/logs.json');
const skillsController = {};

//DATA FORMAT: {skillName: {skillName, goalHrs, description, logs: [{date, log desc, log title}] }}

//receive data in string form, pass it onto front-end in JSON form
skillsController.getSkills = (req, res, next) => {
  fs.readFile(skillsPath, 'UTF-8', (err, data) => {
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
  fs.readFile(skillsPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.getSkills ${err}`,
      message: { err: 'error in skillsController.getSkills' },
    });

    data = JSON.parse(data);
    const { skillName, goalHrs, description, group } = req.body;

    //ensure skill isn't a duplicate
    if(data.skills[skillName]) return next({
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
    data.skills[skillName] = { skillName, goalHrs, description, totalMinutes: 0, group};

    fs.writeFile(skillsPath, JSON.stringify(data), (err) => {
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
//Also delete the relevant logs from logsDB
skillsController.deleteSkill = (req, res, next) => {
  const { skillName } = req.params;
  fs.readFile(skillsPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.deleteSkill ${err}`,
      message: { err: 'Error when attemping to delete.' },
    });

    data = JSON.parse(data);
    res.locals.deletedSkill = data.skills[skillName];
    delete data.skills[skillName];

    fs.writeFile(skillsPath, JSON.stringify(data), (err) => {
      if(err) return next({
        log: `error in skillsController.deleteSkill ${err}`,
        message: { err: 'Error when attemping to delete.' },
      });
    });
  });

  fs.readFile(logsPath, 'UTF-8', (err, logsDB) => {
    if(err) return next({
      log: `error in skillsController.deleteSkill ${err}`,
      message: { err: 'Error when attemping to delete.' },
    });

    logsDB = JSON.parse(logsDB);
    console.log(logsDB)
    delete logsDB[skillName];
    console.log(logsDB)
    
    fs.writeFile(logsPath, JSON.stringify(logsDB), (err) => {
      if(err) return next({
        log: `error in skillsController.deleteSkill ${err}`,
        message: { err: 'Error when attemping to delete.' },
      });

      return next();
    });
  });
};

//Updates total minutes within skills file
skillsController.updateTotalMinutes = (req, res, next) => {
  const { date, hours, minutes, notes, skillName } = req.body;
  const newLog = { date, hours, minutes, notes }
  fs.readFile(skillsPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.postLog ${err}`,
      message: { err: 'Error when attemping to post Log.' },
    });

    data = JSON.parse(data);

    //Convert hours and minutes to minutes only. Add this number to totalMinutes practiced
    data.skills[skillName].totalMinutes += (hours * 60 + minutes);

    fs.writeFile(skillsPath, JSON.stringify(data), (err) => {
      if(err) return next({
        log: `error in skillsController.postLog ${err}`,
        message: { err: 'Error when attemping to post log.' },
      });

      res.locals.newSkills = data;
      return next();
    });
  });
};

//Updates the group for the proper skill
skillsController.changeGroup = (req, res, next) => {
  fs.readFile(skillsPath, 'UTF-8', (err, skillsData) => {
    if(err) return next({
      log: `error in skillsController.postLog ${err}`,
      message: { err: 'Error when attemping to post Log.' },
    });

    skillsData = JSON.parse(skillsData);
    skillsData.skills[req.body.skillName].group = req.body.newGroup;

    fs.writeFile(skillsPath, JSON.stringify(skillsData), (err) => {
      if(err) return next({
        log: `error in skillsController.postLog ${err}`,
        message: { err: 'Error when attemping to post log.' },
      });

      res.locals.skillsWithUpdatedGroup = skillsData;
      return next();
    });
  });
};

module.exports = skillsController;
