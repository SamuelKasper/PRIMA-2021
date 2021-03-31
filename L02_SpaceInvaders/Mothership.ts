namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Mothership extends fc.Node {
        constructor(_x: number, _y: number ) {
            let materialBoss: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 1)));
            let enemieMesh: fc.MeshQuad = new fc.MeshQuad("enemieMesh");

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