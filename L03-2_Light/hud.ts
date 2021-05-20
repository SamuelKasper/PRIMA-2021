namespace L03_PhysicsGame {
    import f = FudgeCore;

    import fui = FudgeUserInterface;
    export class GameState extends f.Mutable {
        public hits: number = 0;
        protected reduceMutator(_mutator: f.Mutable): void {/** */ }
    }

    export let gameState: GameState = new GameState();

    export class Hud {
        private static controller: fui.Controller;

        public static start(): void {
            let domHud: HTMLDivElement = document.querySelector("div");
            Hud.controller = new fui.Controller(gameState, domHud);
            Hud.controller.updateUserInterface();
        }
    }
}