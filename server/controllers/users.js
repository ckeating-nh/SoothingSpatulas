const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.User.fetchAll()
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  console.log('post request: ', req);
  models.User.forge({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email
  })
  .save()
  .then(result => {
    res.status(201).send(result);
  })
  .catch(err => {
    if (err.constraint === 'users_email_unique') {
      return res.status(403);
    }
    res.status(500).send(err);
  });
};

module.exports.getOne = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      res.status(200).send(user);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      return user.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  models.User.where({ id: req.params.id }).fetch()
    .then(user => {
      if (!user) {
        throw user;
      }
      return user.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
