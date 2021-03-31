"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Barrier extends fc.Node {
        constructor(_x, _y, _barriere) {
            let barrierMesh = new fc.MeshQuad("barrierMesh");
            let materialBarrier = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));
            super(`barrier: ${_barriere / 10}, block: ${_x}-${_y}`);
            this.addComponent(new fc.ComponentMesh(barrierMesh));
            this.addComponent(new fc.ComponentMaterial(materialBarrier));
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