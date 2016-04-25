'use strict';

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

