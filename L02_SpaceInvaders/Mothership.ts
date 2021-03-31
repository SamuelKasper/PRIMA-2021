namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Mothership extends fc.Node {
        constructor(_x: number, _y: number ) {
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

}