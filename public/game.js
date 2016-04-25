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
        setPlayer: function (p) {
            player = p;
            return this;
        },
        click: function (e) {
            if (player) {
                player.jump(e.realX, e.realY);
            }
        }
    });
};

var startButtonComponent = () => {
    Crafty.c('StartButton', {
        init: function () {
            this.requires('2D,MouseTracker');

            this.attach(
                Crafty.e('2D,DOM,Color,Mouse')
                    .attr({x: 0, y: 0, w: 150, h: 110})
                    .color('#000000')
                    .bind('MouseOver', function () {
                        this.color('#FFFF00');
                    })
                    .bind('MouseOut', function () {
                        this.color('#000000');
                    })
                    .bind('MouseDown', (e) => {
                        this.click(e);
                    })
            );

            this.attach(
                Crafty.e('2D,DOM,Color')
                    .attr({x: 20, y: 25, w: 110, h: 60})
                    .color('#FFFFFF')
            );

            this.attach(
                Crafty.e('2D,DOM,Text')
                    .attr({x: 20, y: 25, w: 110, h: 60})
                    .text('Start')
                    .textFont({size: '50px'})
            );
        }
    });
};

var playerConstructor = (x, y, color, clickEntity) => {
    var player,
        clickArea;
    
    player = Crafty.e('Player')
        .attr({x: x, y: y, w: 50, h: 100})
        .color(color)
        .gravity('Platform')
        .gravityConst(2000)
    ;

    if (!clickEntity) {
        clickEntity = Crafty.e('MouseTracker')
            .attr({
                x: 0,
                y: 0,
                w: width,
                h: height
            })
        ;
    }

    clickEntity.setPlayer(player);

    return player;
};

var startButton = () => {
    return Crafty.e('StartButton')
        .attr({x: 680, y: height - height/2 - 25})
    ;
};

var startMenu = () => {

    Crafty.scene('menu', () => {
        var start;
        Crafty.background('#FFFFFF');

        platformConstructor(0, height - 25, width, 25, '#000000');

        start = startButton();
        playerConstructor(125, height - 25, '#FF0000', start);
    });
};

(() => {

    Crafty.init(width, height, 'game');
    playerComponent();
    startButtonComponent();

    startMenu();

    Crafty.scene('menu');
})();

