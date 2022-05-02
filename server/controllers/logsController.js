const fs = require('fs');
const path = require('path');

const logsPath = path.resolve(__dirname, '../../data/logs.json');
const logsController = {};

logsController.getLogs = (req, res, next) => {
  fs.readFile(logsPath, 'UTF-8', (err, logsDB) => {
    if(err) return next({
      log: `error in skillsController.postLog ${err}`,
      message: { err: 'Error when attemping to post Log.' },
    });
    logsDB = JSON.parse(logsDB);
    res.locals.logsForSkill = logsDB[req.params.skillName];
    return next();
  });
};

//Receives new log data and writes it to db. 
logsController.postLog = (req, res, next) => {
  const { date, hours, minutes, notes, skillName } = req.body;
  const newLog = { date, hours, minutes, notes }

  //If hours & minutes are both 0, return error to front-end
  if(hours == 0 && minutes == 0) return next({
    log: 'error in skillsController.postLog: both hours and minutes cannot be zero',
    message: { err: 'Both hours and minutes cannot be zero.' },
  }); 

  //Add log to logs data file
  fs.readFile(logsPath, 'UTF-8', (err, data) => {
    if(err) return next({
      log: `error in skillsController.postLog ${err}`,
      message: { err: 'Error when attemping to post Log.' },
    });

    data = JSON.parse(data);
    if(!data[skillName]) data[skillName] = [];
    data[skillName].push(newLog);

    fs.writeFile(logsPath, JSON.stringify(data), (err) => {
      if(err) return next({
        log: `error in skillsController.postLog ${err}`,
        message: { err: 'Error when attemping to post log.' },
      });

      res.locals.newLog = newLog;
      return next();
    });
  });
};

logsController.deleteLog = (req, res, next) => {
  const { skillName, logIndex } = req.params;
  fs.readFile(logsPath, 'UTF-8', (err, logsDB) => {
    if(err) return next({
      log: `error in skillsController.deleteLog ${err}`,
      message: { err: 'Error when attemping to delete Log.' },
    });
    logsDB = JSON.parse(logsDB);
    logsDB[skillName].splice(logIndex, 1);

    fs.writeFile(logsPath, JSON.stringify(logsDB), (err) => {
      if(err) return next({
        log: `error in skillsController.deleteLog ${err}`,
        message: { err: 'Error when attemping to delete Log.' },
      });

      res.locals.deletedLogIndex = {logIndex};
      return next();
    });
  });
};
module.exports = logsController;