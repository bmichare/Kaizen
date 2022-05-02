const fs = require('fs');
const path = require('path');

const skillsPath = path.resolve(__dirname, '../../data/skills.json');
const groupsController = {};

//DATA FORMAT: {skillName: {skillName, goalHrs, description, logs: [{date, log desc, log title}] }}
//May need to refactor for separate gorup data file
groupsController.createGroup = (req, res, next) => {
  fs.readFile(skillsPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in groupsController.createGroup ${err}`,
      message: { err: 'Error when attemping to create group.' },
    });

    data = JSON.parse(data);
    data.groups[req.body.groupName] = true;
    console.log(data);
    res.locals.newGroups = data.groups;

    fs.writeFile(skillsPath, JSON.stringify(data), (err, data) => {
      if(err) return next({
        log: `error in groupsController.createGroup ${err}`,
        message: { err: 'Error when attemping to create group.' },
      });

      return next();
    });
  });
};

groupsController.deleteGroup = (req, res, next) => {
  fs.readFile(skillsPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in groupsController.createGroup ${err}`,
      message: { err: 'Error when attemping to create group.' },
    });
    
    data = JSON.parse(data);
    delete data.groups[req.params.groupName]
    res.locals.updatedGroups = data.groups;

    fs.writeFile(skillsPath, JSON.stringify(data), (err, data) => {
      if(err) return next({
        log: `error in groupsController.createGroup ${err}`,
        message: { err: 'Error when attemping to create group.' },
      });

      return next();
    });
  });
};

module.exports = groupsController;
