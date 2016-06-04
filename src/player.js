'use strict';

var playerComponent = () => {
    var player;

    Crafty.c('Player', {
        init: function () {
            this.requires('DOM, Color, Gravity, Collision');
            this.bind('LandedOnGround', () => {
                this.attr({vx: 0});
            });
        },
        jump: function (x, y) {
            var attr, midY, bottomY, midX, dx, dy;

            // Alternative: apex is at middle of player rectangle
            // Consideration for further iterations
            midY = this.y + this.h/2;
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
        clickEntity = Crafty.e('2D,MouseTracker,Mouse')
            .attr({
                x: 0,
                y: 0,
                w: Crafty.viewport.width,
                h: Crafty.viewport.height
            })
            .bind('MouseDown', function (e) {
                this.click(e);
            })
        ;
    }

    clickEntity.setPlayer(player);

    return player;
};
