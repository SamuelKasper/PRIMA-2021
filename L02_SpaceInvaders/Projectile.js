"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Projectile extends fc.Node {
        constructor(_x, _y) {
            let materialProjectile = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 1)));
            let projectileMesh = new fc.MeshQuad("projectileMesh");
            super("Projectile");
            this.addComponent(new fc.ComponentMesh(projectileMesh));
            this.addComponent(new fc.ComponentMaterial(materialProjectile));
            //Skalierung
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.1);
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
            //Position
            this.addComponent(new fc.ComponentTransform);
            this.mtxLocal.translateY(_y + 0.2); // 0.2 damit der Laser nicht im Raumschiff startet
            this.mtxLocal.translateX(_x);
        }
        shot() {
            this.mtxLocal.translateY(0.4);
        }
    }
    L02_spaceInvaders.Projectile = Projectile;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Projectile.js.map