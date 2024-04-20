const express = require('express');
const ideasRouter = express.Router();
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.use('/:ideaId', (req, res, next) => {
  const idea = db.getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = db.addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  db.deleteFromDatabasebyId('ideas', req.params.ideaId);
  res.status(204).send();
});

module.exports = ideasRouter;