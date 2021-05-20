"use strict";
var L03_PhysicsGame;
(function (L03_PhysicsGame) {
    var f = FudgeCore;
    var fui = FudgeUserInterface;
    class GameState extends f.Mutable {
        constructor() {
            super(...arguments);
            this.hits = 0;
        }
        reduceMutator(_mutator) { }
    }
    L03_PhysicsGame.GameState = GameState;
    L03_PhysicsGame.gameState = new GameState();
    class Hud {
        static start() {
            let domHud = document.querySelector("div");
            Hud.controller = new fui.Controller(L03_PhysicsGame.gameState, domHud);
            Hud.controller.updateUserInterface();
        }
    }
    L03_PhysicsGame.Hud = Hud;
})(L03_PhysicsGame || (L03_PhysicsGame = {}));
//# sourceMappingURL=hud.js.map