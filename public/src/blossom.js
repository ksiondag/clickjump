'use strict';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var blossomConstructor = () => {
    var blossom = Crafty.e('Blossom,2D,DOM,Color,Collision,Motion')
        .color('pink')
        .attr({
            x: getRandomInt(0, Crafty.viewport.width - 50),
            y: 0,
            w: 20,
            h: 20,
            vy: 100
        })
        .checkHits('Platform,Blossom,Player')
        .bind('HitOn', function () {
            this.attr({vy: 0});
            this.removeComponent('Motion,Collision');
        })
    ;
};

var blossomIntervalID;
Crafty.scene('blossom', function (p) {
    var height = Crafty.viewport.height,
        width = Crafty.viewport.width;

    var player;

    Crafty.background('#FFFFFF');
    platformConstructor(0, height - 25, width, 25, '#000000');
    wallConstructor(-100, 0, 100, height, '#000000');
    wallConstructor(width + 1, 0, 100, height, '#000000');

    player = playerConstructor(p.x, p.y, p.color());
    blossomIntervalID = setInterval(blossomConstructor, 1000);
}, function () {
    if (blossomIntervalID) {
        clearInterval(blossomIntervalID);
    }
});

