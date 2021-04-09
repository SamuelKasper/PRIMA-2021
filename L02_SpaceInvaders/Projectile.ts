namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Projectile extends QuadNode {
        constructor(_x: number, _y: number ) {
            super("Projectile", new fc.Vector2(_x, _y + 0.3), new fc.Vector2(0.1, 0.6));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(1, 0, 0.4, 1);
        }

        public move(): void {
            this.mtxLocal.translateY(5 * fc.Loop.timeFrameReal / 1000);
            this.setRectPosition();
        }
    }

}