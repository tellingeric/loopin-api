var express = require('express');
var router = express.Router();

var users = require('./users.js');

// USERS
router.get('/api/users', users.getAll);
router.post('/api/users', users.create);
router.delete('/api/users/:user_id', users.remove);


module.exports = router;
