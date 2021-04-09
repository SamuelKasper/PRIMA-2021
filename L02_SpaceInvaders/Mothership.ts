namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Mothership extends QuadNode {
        constructor(_x: number, _y: number ) {
            super("Mothership", new fc.Vector2(_x, _y), new fc.Vector2(2, 0.8)); 
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(1, 0.4, 0.4, 1);
        }
    }

}