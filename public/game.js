'use strict';
var width = 1250,
    height = 875;

var platformConstructor = (x, y, w, h, color) => {
    var entity = Crafty.e('2D, DOM, Color, Platform')
        .attr({x: x, y: y, w: w, h: h})
        .color(color)
    ;

    return entity;
};

var calculateVelocity = function (dx, dy) {
    var dt, vy, vx;

    if (dy < 0 && !this._gravityActive) {
        this.trigger('LiftedOffGround');
        vy = -Math.sqrt(-dy*this.ay*2);
        dt = Math.sqrt(2*-dy/this.ay);
        vx = dx/dt;
    } else {
        vy = this.vy;
        vx = this.vx;
    }

    return {vy: vy, vx: vx};
};

var playerComponent = () => {
    var player;

    Crafty.c('Player', {
        init: function () {
            this.requires('DOM, Color, Gravity');
            this.bind('LandedOnGround', () => {
                this.attr({vx: 0});
            });
        },
        jump: function (x, y) {
            var attr, bottomY, midX, dx, dy;

            bottomY = this.y + this.h;
            midX = this.x + this.w/2;

            dx = x - midX;
            dy = y - bottomY;

            attr = calculateVelocity.apply(this, [dx, dy]);
            this.attr(attr);
            return this;
        }
    });

    Crafty.c('MouseTracker', {
        init: function () {
            this.requires('Mouse, 2D');
            this.bind('MouseDown', (e) => {
                if (player) {
                    player.jump(e.realX, e.realY);
                }
            });
        },
        setPlayer: function (p) {
            player = p;
            return this;
        }
    });
};

var playerConstructor = (x, y, color, clickableArea) => {
    var player,
        clickArea;
    
    player = Crafty.e('Player')
        .attr({x: x, y: y, w: 50, h: 100})
        .color(color)
        .gravity('Platform')
        .gravityConst(2000)
    ;

    if (!clickableArea) {
        clickableArea = {
            x: 0,
            y: 0,
            w: width,
            h: height
        };
    }

    clickArea = Crafty.e('MouseTracker')
        .setPlayer(player)
        .attr(clickableArea)
    ;

    return player;
};

var startMenu = () => {

    Crafty.scene('menu', () => {
        Crafty.background('#FFFFFF');

        platformConstructor(0, height - 25, width, 25, '#00FF00');
        platformConstructor(100, height - height/4, 100, 25, '#00FF00');

        Crafty.e('2D, DOM, Color, Start')
            .attr({x: 680, y: height - height/2 - 25, w: 150, h: 110})
            .color('#000000')
        ;

        Crafty.e('2D, DOM, Color, Start')
            .attr({x: 700, y: height - height/2, w: 110, h: 60})
            .color('#FFFFFF')
        ;

        Crafty.e('2D, DOM, Text, Start')
            .attr({x: 700, y: height - height/2, w: 110, h: 200})
            .text('Start')
            .textFont({size: '50px'})
        ;

        playerConstructor(125, height - height/4, '#0000FF');
    });
};

(() => {

    Crafty.init(width, height, 'game');
    playerComponent();

    startMenu();

    Crafty.scene('menu');
})();

