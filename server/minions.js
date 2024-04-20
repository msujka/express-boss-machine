const express = require('express');
const minionsRouter = express.Router();
const db = require('./db.js');

minionsRouter.use('/:minionId', (req, res, next) => {
  const minion = db.getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
      req.minion = minion;
      next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = db.addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  db.deleteFromDatabasebyId('minions', req.params.minionId);
  res.status(204).send();
});

module.exports = minionsRouter;