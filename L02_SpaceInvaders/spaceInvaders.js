"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new fc.Viewport();
    //Haupt Node
    let rootNode = new fc.Node("root");
    //Barriere
    let barrierNode = new fc.Node("barrier");
    //Invaders (+ Mutterschiff)
    let enemieNode = new fc.Node("enemie");
    //Charakter
    let characterNode;
    let speedCharacter = 1;
    //Projektile
    let projectileNode = new fc.Node("projectile");
    let newProjectile = true;
    let reloadeTime = 2000;
    function init(_event) {
        //Canvas holen und speichern
        const canvas = document.querySelector("canvas");
        //Camera erstellen und verschieben
        let comCamera = new fc.ComponentCamera();
        comCamera.mtxPivot.translateZ(15);
        comCamera.mtxPivot.translateY(4.6);
        comCamera.mtxPivot.rotateY(180);
        //Nodes an rootNode hängen
        rootNode.addChild(barrierNode);
        rootNode.addChild(enemieNode);
        rootNode.addChild(projectileNode);
        createCharacter();
        createBarrier();
        createEnemie();
        console.log(rootNode);
        //viewport initialisieren
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL, 30);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function createCharacter() {
        characterNode = new L02_spaceInvaders.Character();
        rootNode.addChild(characterNode);
    }
    function createBarrier() {
        //Position Barriere
        let posBarriere = 0; //verschiebung der großen Blöcke
        let posBarrierColumn = 0; //verschiebung nach y im großen Block
        let posBarrierRow = 0; //verschiebung nach x im großen Block
        /*** Barrieren Block erzeugen ***/
        for (let i = 0; i < 5; i++) {
            //verschiebung nach rechts
            posBarriere += 3;
            //zurücksetzten der reihenverschiebung
            posBarrierRow = 0;
            /*** Reihen erzeugen ***/
            for (let row = 0; row < 5; row++) {
                //verschiebung nach rechts
                posBarrierRow += 0.3;
                //zurücksetzen der Höhe
                posBarrierColumn = 0;
                /*** Spalten erzeugen ***/
                for (let k = 0; k < 4; k++) {
                    let barriers = new L02_spaceInvaders.Barrier(posBarrierRow, posBarrierColumn, posBarriere);
                    posBarrierColumn += 0.3;
                    //block an bariereNode anhängen
                    barrierNode.addChild(barriers);
                }
            }
        }
    }
    function createEnemie() {
        /*** Mutterschiff ***/
        let posxMothership = 0;
        let posyMothership = 8.7;
        //Klassenaufruf
        enemieNode.addChild(new L02_spaceInvaders.Mothership(posxMothership, posyMothership));
        /*** Kleine Gegner ***/
        let posxEnemie = 0;
        let posyEnemie = 0;
        for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
            posyEnemie += 1;
            posxEnemie = 0;
            for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
                //Klassenaufruf
                let name = "enemie: " + columnIndex + ", " + rowIndex;
                let enemie = new L02_spaceInvaders.Invader(posxEnemie, posyEnemie, name);
                posxEnemie += 1.5;
                enemieNode.addChild(enemie);
            }
        }
    }
    //Erlaubt feuern eines neuen Projectiles 
    function checkProjectile() {
        newProjectile = true;
    }
    function update(_event) {
        let offset = speedCharacter * fc.Loop.timeFrameReal / 1000;
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])) {
            characterNode.mtxLocal.translateX(-offset);
        }
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])) {
            characterNode.mtxLocal.translateX(+offset);
        }
        //Als keydown event außerhalb der update
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.SPACE])) {
            if (newProjectile == true) {
                let projectile = new L02_spaceInvaders.Projectile(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
                projectileNode.addChild(projectile);
                newProjectile = false;
                fc.Time.game.setTimer(reloadeTime, 1, checkProjectile);
            }
        }
        for (let projectile of projectileNode.getChildren()) {
            projectile.move();
            if (projectile.mtxLocal.translation.y > 9) {
                projectileNode.removeChild(projectile);
            }
        }
        collisionDetection();
        viewport.draw();
    }
    function collisionDetection() {
        for (let projectile of projectileNode.getChildren()) {
            for (let enemie of enemieNode.getChildren()) {
                if (projectile.checkCollision(enemie)) {
                    console.log("collision detected");
                    projectileNode.removeChild(projectile);
                    enemieNode.removeChild(enemie);
                }
            }
        }
        for (let projectile of projectileNode.getChildren()) {
            for (let barriere of barrierNode.getChildren()) {
                if (projectile.checkCollision(barriere)) {
                    console.log("collision detected");
                    projectileNode.removeChild(projectile);
                    barrierNode.removeChild(barriere);
                }
            }
        }
    }
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=spaceInvaders.js.map