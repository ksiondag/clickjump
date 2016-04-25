'use strict';

var platformConstructor = (x, y, w, h, color) => {
    var entity = Crafty.e('2D, DOM, Color, Platform')
        .attr({x: x, y: y, w: w, h: h})
        .color(color)
    ;

    return entity;
};

var wallConstructor = (x, y, w, h, color) => {
    var entity = Crafty.e('2D, DOM, Color, Wall, Collision')
        .attr({x: x, y: y, w: w, h: h})
        .color(color)
        .checkHits('Player')
        .bind('HitOn', function (hitData) {
            console.log(hitData[0].overlap);
            hitData[0].obj.attr({vx:0});
            hitData[0].obj.x += hitData[0].overlap;
        })
    ;

    return entity;
};
