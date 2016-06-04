'use strict';

var calculateVelocity = function (dx, dy) {
    var dt, vy, vx;

    if (dy < 0 && !this._gravityActive) {
        /*
        // Alternative idea: slightly variable x speed based off of dx, and
        // calculating everything else from there
        vx = dx*2; // This number's calculation needs fine-tuning
        dt = dx/vx;
        gravity = 2*-dy/(dt*dt);

        this.gravityConst(gravity);
        this.trigger('LiftedOffGround');

        vy = -Math.sqrt(-dy*this.ay*2);
        */
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

