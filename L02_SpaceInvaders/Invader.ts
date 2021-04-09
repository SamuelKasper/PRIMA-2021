namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Invader extends QuadNode {
        constructor(_x: number, _y: number, _name: string ) {
            super(_name, new fc.Vector2(-7.5 + _x, 8.5 - _y), new fc.Vector2(1, 0.6));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0, 1, 0, 1);
        }
    }
}