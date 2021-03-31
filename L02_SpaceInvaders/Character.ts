namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Character extends fc.Node {
        constructor() {
            let characterTurretMesh: fc.MeshQuad = new fc.MeshQuad("characterTurretMesh");
            let characterMesh: fc.MeshQuad = new fc.MeshQuad("characterMesh");
            let characterMaterial: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));

            super("character"); 
            //Lokale Variablen
            let characterNodeTurret: fc.Node = new fc.Node("turret");
            
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

}