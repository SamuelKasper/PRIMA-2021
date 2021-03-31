"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Mothership extends fc.Node {
        constructor(_x, _y) {
            let materialBoss = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 1)));
            let enemieMesh = new fc.MeshQuad("enemieMesh");
            super("Mothership");
            this.addComponent(new fc.ComponentMesh(enemieMesh));
            this.addComponent(new fc.ComponentMaterial(materialBoss));
            //Skalierung Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleX(2);
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.8);
            //Position Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.translateY(_y);
        }
    }
    L02_spaceInvaders.Mothership = Mothership;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Mothership.js.map