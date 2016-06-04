'use strict';

var startButtonComponent = () => {
    Crafty.c('StartButton', {
        init: function () {
            this.requires('2D,MouseTracker');

            this.attach(
                Crafty.e('2D,DOM,Color,Mouse,Collision')
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
                    .checkHits('Player')
                    .bind('HitOn', function (hitData) {
                        Crafty.scene('blossom', hitData[0].obj);
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

var startButton = () => {
    return Crafty.e('StartButton')
        .attr({x: 680, y: Crafty.viewport.height - Crafty.viewport.height/2 - 25})
    ;
};


Crafty.scene('menu', () => {
    var height = Crafty.viewport.height,
        width = Crafty.viewport.width;

    var start;
    Crafty.background('#FFFFFF');

    platformConstructor(0, height - 25, width, 25, '#000000');

    start = startButton();
    playerConstructor(125, height - 25, '#FF0000', start);
});
