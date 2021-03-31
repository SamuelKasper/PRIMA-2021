"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Character extends fc.Node {
        constructor() {
            let characterTurretMesh = new fc.MeshQuad("characterTurretMesh");
            let characterMesh = new fc.MeshQuad("characterMesh");
            let characterMaterial = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));
            super("character");
            //Lokale Variablen
            let characterNodeTurret = new fc.Node("turret");
            //Mesh & Material character body
            this.addComponent(new fc.ComponentMesh(characterMesh));
            this.addComponent(new fc.ComponentMaterial(characterMaterial));
            //Skalierung Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.3);
            //Mesh & Material character turret
            //Turret an character hängen
            this.addChild(characterNodeTurret);
            characterNodeTurret.addComponent(new fc.ComponentMesh(characterTurretMesh));
            characterNodeTurret.addComponent(new fc.ComponentMaterial(characterMaterial));
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.2);
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
        }
    }
    L02_spaceInvaders.Character = Character;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=character.js.map