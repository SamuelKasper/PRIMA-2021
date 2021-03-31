namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Barrier extends fc.Node {
        constructor(_x: number, _y: number, _barriere: number ) {
            let barrierMesh: fc.MeshQuad = new fc.MeshQuad("barrierMesh");
            let materialBarrier: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));

            super(`barrier: ${_barriere / 10}, block: ${_x}-${_y}`); 
            this.addComponent(new fc.ComponentMesh(barrierMesh));
            this.addComponent(new fc.ComponentMaterial(materialBarrier));
            //Skalierung Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.3);
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.3);
            
            //Position Gegner
            this.getComponent(fc.ComponentMesh).mtxPivot.translateY(7 - _y);
            this.getComponent(fc.ComponentMesh).mtxPivot.translateX(-27 - _x + _barriere);
        }
    }

}