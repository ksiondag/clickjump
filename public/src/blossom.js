
Crafty.scene('blossom', function (p) {
    var height = Crafty.viewport.height,
        width = Crafty.viewport.width;

    var player;

    Crafty.background('#FFFFFF');
    platformConstructor(0, height - 25, width, 25, '#000000');
    wallConstructor(-100, 0, 100, height, '#000000');
    wallConstructor(width + 1, 0, 100, height, '#000000');

    player = playerConstructor(p.x, p.y, p.color());
});

