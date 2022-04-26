const express = require('express');
const skillsController = require('../controllers/skillsController');
const logsController = require('../controllers/logsController');

const app = express.Router();

app.get('/', skillsController.getSkills, (req, res) => res.status(200).json(res.locals.skillsData));
app.post('/',skillsController.createSkill, (req, res) => res.status(200).json(res.locals.newSkills));
app.delete('/:skillName', skillsController.deleteSkill, (req, res) => res.status(200).json(res.locals.deletedSkill));

app.get('/logs/:skillName', logsController.getLogs, (req, res) => res.status(200).json(res.locals.logsForSkill));
app.post('/logs', logsController.postLog, skillsController.updateTotalMinutes, (req, res) => res.status(200).json(res.locals));
app.delete('/logs/:skillName/:logIndex', logsController.deleteLog, (req, res) => res.status(200).json(res.locals.deletedLogIndex));
// app.delete('/logs/', () => console.log('test') );

app.patch('/group', skillsController.changeGroup, (req, res) => res.status(200).json(res.locals.skillsWithUpdatedGroup));

module.exports = app;

