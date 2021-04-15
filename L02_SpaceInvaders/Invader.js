"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Invader extends L02_spaceInvaders.QuadNode {
        constructor(_x, _y, _name) {
            super(_name, new fc.Vector2(-7.5 + _x, 8 - _y), new fc.Vector2(1, 0.6));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0, 1, 0, 1);
        }
    }
    L02_spaceInvaders.Invader = Invader;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Invader.js.map