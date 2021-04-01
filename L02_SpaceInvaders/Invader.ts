namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Invader extends fc.Node {
        constructor(_x: number, _y: number, _name: string ) {
            let enemieMesh: fc.MeshQuad = new fc.MeshQuad("enemieMesh");
            let material: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 0, 1)));

            super(_name); 
            this.addComponent(new fc.ComponentMesh(enemieMesh));
            this.addComponent(new fc.ComponentMaterial(material));
            //Skalierung Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleX(1);
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
            
            //Position Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.translateX(-7.5 + _x);
            this.getComponent(fc.ComponentMesh).mtxPivot.translateY(14.5 - _y);
        }
    }

}