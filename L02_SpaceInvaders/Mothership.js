"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Mothership extends L02_spaceInvaders.QuadNode {
        constructor(_x, _y) {
            super("Mothership", new fc.Vector2(_x, _y), new fc.Vector2(2, 0.8));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(1, 0.4, 0.4, 1);
        }
    }
    L02_spaceInvaders.Mothership = Mothership;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Mothership.js.map