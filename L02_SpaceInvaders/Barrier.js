"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Barrier extends fc.Node {
        constructor(_x, _y, _barriere) {
            super(`barrier: ${_barriere / 10}, block: ${_x}-${_y}`);
            this.addComponent(new fc.ComponentMesh(L02_spaceInvaders.barrierMesh));
            this.addComponent(new fc.ComponentMaterial(L02_spaceInvaders.materialBarrier));
            //Skalierung Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.3);
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.3);
            //Position Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.translateY(7 - _y);
            this.getComponent(fc.ComponentMesh).mtxPivot.translateX(-27 - _x + _barriere);
        }
    }
    L02_spaceInvaders.Barrier = Barrier;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Barrier.js.map