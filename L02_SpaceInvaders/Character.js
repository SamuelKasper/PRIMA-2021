"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    class Character extends fc.Node {
        constructor() {
            super("character");
            //Lokale Variablen
            let characterNodeTurret = new fc.Node("turret");
            //Mesh & Material character body
            this.addComponent(new fc.ComponentMesh(L02_spaceInvaders.characterMesh));
            this.addComponent(new fc.ComponentMaterial(L02_spaceInvaders.characterMaterial));
            //Skalierung Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.3);
            //Mesh & Material character turret
            //Turret an character hängen
            this.addChild(characterNodeTurret);
            characterNodeTurret.addComponent(new fc.ComponentMesh(L02_spaceInvaders.characterTurretMesh));
            characterNodeTurret.addComponent(new fc.ComponentMaterial(L02_spaceInvaders.characterMaterial));
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.2);
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
        }
    }
    L02_spaceInvaders.Character = Character;
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=character.js.map