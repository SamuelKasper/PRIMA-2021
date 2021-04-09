"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Projectile extends L02_spaceInvaders.QuadNode {
        constructor(_x, _y) {
            super("Projectile", new fc.Vector2(_x, _y + 0.3), new fc.Vector2(0.1, 0.6));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(1, 0, 0.4, 1);
        }
        move() {
            this.mtxLocal.translateY(5 * fc.Loop.timeFrameReal / 1000);
            this.setRectPosition();
        }
    }
    L02_spaceInvaders.Projectile = Projectile;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map