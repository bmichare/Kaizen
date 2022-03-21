const express = require('express');
const skillsController = require('../controllers/skillsController');

const app = express.Router();

app.get('/', skillsController.getSkills, (req, res) => res.status(200).json(res.locals.skillsData));

app.post('/',skillsController.createSkill, (req, res) => res.status(200).json(res.locals.newSkills));

app.delete('/:skillName', skillsController.deleteSkill, (req, res) => res.status(200).json(res.locals.deletedSkill));


app.post('/log', skillsController.postLog, (req, res) => res.status(200).json(res.locals.postedLog));

module.exports = app;

