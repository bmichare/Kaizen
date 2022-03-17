const express = require('express');
const skillsController = require('../controllers/skillsController');

const app = express.Router();

app.get('/', skillsController.getSkills, (req, res) => res.status(200).send(res.locals.skillsData));

app.post('/',skillsController.createSkill, (req, res) => res.status(200).send(res.locals.newSkills));

module.exports = app;
