const express = require('express');
const groupsController = require('../controllers/groupsController');

const app = express.Router();

// app.get('/', skillsController.getSkills, (req, res) => res.status(200).json(res.locals.skillsData));

app.post('/',groupsController.createGroup, (req, res) => res.status(200).json(res.locals.newGroups));

app.delete('/:groupName', groupsController.deleteGroup, (req, res) => res.status(200).json(res.locals.updatedGroups));


module.exports = app;

