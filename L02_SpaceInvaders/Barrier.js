"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Barrier extends L02_spaceInvaders.QuadNode {
        constructor(_x, _y, _barriere) {
            super(`barrier: ${_barriere / 10}, block: ${_x}-${_y}`, new fc.Vector2(-8 - _x + _barriere, 2 - _y), new fc.Vector2(0.3, 0.3));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0.9, 0.9, 0.9, 1);
        }
    }
    L02_spaceInvaders.Barrier = Barrier;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Barrier.js.map