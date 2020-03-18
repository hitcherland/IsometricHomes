const Wall = require('./templates/wall.js');
const Floor = require('./templates/floor.js');
const Roof = require('./templates/roof.js');

module.exports = {
    Wall: Wall.Wall,
    FlatWall: Wall.FlatWall,
    Floor: Floor.Floor,
    SimpleRoof: Roof.SimpleRoof
};
