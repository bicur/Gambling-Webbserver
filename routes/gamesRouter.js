const express = require('express');
const router = express.Router();
const dataBasConn = require("../databaseUsers");

router.get('/games', function(req, res){
    res.render('games');
});

router.get('/games/:game', async function(req, res){
    res.send(reg.param.game)
});

module.exports = router;