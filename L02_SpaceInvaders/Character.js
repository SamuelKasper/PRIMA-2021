"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Character extends L02_spaceInvaders.QuadNode {
        constructor() {
            super("character", new fc.Vector2(0, 0), new fc.Vector2(1, 0.3));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0, 0.3, 0.6, 1);
            //Turret 
            let characterNodeTurret = new fc.Node("turret");
            this.addChild(characterNodeTurret);
            characterNodeTurret.addComponent(new fc.ComponentMesh(L02_spaceInvaders.QuadNode.mesh));
            characterNodeTurret.addComponent(new fc.ComponentMaterial(L02_spaceInvaders.QuadNode.material));
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.2);
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
            characterNodeTurret.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0, 0.3, 0.6, 1);
        }
    }
    L02_spaceInvaders.Character = Character;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=Character.js.map