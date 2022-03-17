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
      message: 'error in skillsController.getSkills: skill already exists',
    });

    //ensure skillName is not empty
    if(!skillName) return next({
      log: 'error in skillsController.createSkill: skillName cannot be empty',
      message: 'error in skillsController.getSkills: skillName cannot be empty',
    });

    //add new skill & info to data object, write updated data to database, then return updated data to front-end
    data[skillName] = { skillName, goalHrs, description, logs: [], };

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

module.exports = skillsController;
