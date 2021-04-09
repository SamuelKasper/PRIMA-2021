namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Character extends QuadNode {
        constructor() {
            super("character", new fc.Vector2(0, 0), new fc.Vector2(1, 0.3));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0, 0.3, 0.6, 1);

            //Turret 
            let characterNodeTurret: fc.Node = new fc.Node("turret");
            this.addChild(characterNodeTurret);
            
            characterNodeTurret.addComponent(new fc.ComponentMesh(QuadNode.mesh));
            characterNodeTurret.addComponent(new fc.ComponentMaterial(QuadNode.material));
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.2);
            characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
            characterNodeTurret.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0, 0.3, 0.6, 1);
        }
    }

}