namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Projectile extends fc.Node {
        constructor(_x: number, _y: number ) {
            let materialProjectile: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 1)));
            let projectileMesh: fc.MeshQuad = new fc.MeshQuad("projectileMesh");

            super("Projectile"); 
            this.addComponent(new fc.ComponentMesh(projectileMesh));
            this.addComponent(new fc.ComponentMaterial(materialProjectile));
            //Skalierung
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.2);
            this.getComponent(fc.ComponentMesh).mtxPivot.scaleY(1);
            
            //Position
            this.addComponent(new fc.ComponentTransform);
            this.mtxLocal.translateY(_y);
            this.mtxLocal.translateX(_x);
            
        }

        public shot(): void {
            this.mtxLocal.translateY(1);
        }
    }

}