namespace L02_spaceInvaders {
    import fc = FudgeCore;
    export class Barrier extends QuadNode {
        constructor(_x: number, _y: number, _barriere: number ) {
            super(`barrier: ${_barriere / 10}, block: ${_x}-${_y}`, new fc.Vector2(-8 - _x + _barriere, 2 - _y), new fc.Vector2(0.3, 0.3));
            this.getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(0.9, 0.9, 0.9, 1);
        }
    }

}