'use strict';

playerComponent();
startButtonComponent();

Crafty.scene('blossom', {
    x: 100,
    y: Crafty.viewport.height - 100,
    color: () => 'red'
});

