'using strict';
(() => {
    var width = 1250,
        height = 875;

    Crafty.init(width, height, 'game');

    Crafty.background('#FFFFFF');

    Crafty.e('2D, DOM, Color, Platform')
        .attr({x: 0, y: height - 25, w: width, h: 100})
        .color('#00FF00')
    ;

    Crafty.e('2D, DOM, Color, Platform')
        .attr({x: 100, y: height - height/4, w: 100, h: 25})
        .color('#00FF00')
    ;

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

    Crafty.e('2D, DOM, Color, Gravity')
        .attr({x: 125, y: height - height/4, w: 50, h: 100})
        .color('#0000FF')
        .gravity('Platform')
        .gravityConst(2000)
    ;
})();

