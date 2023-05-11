const {Sequelize} = require('sequelize');
const Place = require('./Models/place');
const Costume = require('./Models/costume');
const Gun = require('./Models/gun');
const Player = require('./Models/player');

const database = new Sequelize(
    `postgres://postgres:admin@localhost:5432/killer`
,{logging:false});

Place(database);
Costume(database);
Gun(database);
Player(database)

// const {Place , Costume , Gun } = database.models

module.exports = {database , ...database.models};