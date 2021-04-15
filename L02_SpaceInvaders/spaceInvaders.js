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
    let enemieColumnNode;
    //Charakter
    let characterNode;
    let speedCharacter = 1;
    //Projektile
    let projectileNode = new fc.Node("projectile");
    let newProjectile = true;
    let newInvaderProjectile = true;
    let reloadeTime = 1000;
    //Invader Bewegen
    let allowMove = true;
    let direction = "";
    let down = true;
    let stopMovingDown = false;
    let mothershipMoveRight = true;
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
        enemieNode.addComponent(new fc.ComponentTransform());
        /*** Mutterschiff ***/
        let posxMothership = 0;
        let posyMothership = 8.7;
        //Klassenaufruf
        enemieNode.addChild(new L02_spaceInvaders.Mothership(posxMothership, posyMothership));
        /*** Kleine Gegner ***/
        let posxEnemie = 0;
        let posyEnemie = 0;
        for (let columnIndex = 0; columnIndex < 10; columnIndex++) {
            enemieColumnNode = new fc.Node(`enemieColumnNode: ${columnIndex}`);
            enemieNode.addChild(enemieColumnNode);
            posxEnemie += 1.5;
            posyEnemie = 0;
            for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
                //Klassenaufruf
                let name = "enemie: " + columnIndex + ", " + rowIndex;
                let enemie = new L02_spaceInvaders.Invader(posxEnemie, posyEnemie, name);
                posyEnemie += 1;
                enemieColumnNode.addChild(enemie);
            }
        }
    }
    //Erlaubt feuern eines neuen Projectiles 
    function checkProjectile() {
        newProjectile = true;
    }
    function checkProjectileInvader() {
        newInvaderProjectile = true;
    }
    function collisionDetection() {
        //Enemie Collision
        for (let projectile of projectileNode.getChildren()) {
            for (let enemieColumnNodes of enemieNode.getChildren()) {
                for (let enemie of enemieColumnNodes.getChildren()) {
                    if (projectile.checkCollision(enemie)) {
                        console.log("collision detected");
                        projectileNode.removeChild(projectile);
                        enemieColumnNodes.removeChild(enemie);
                        //SpaltenNode löschen wenn keine Enemies mehr vorhanden
                        if (enemieColumnNodes.getChildren().length < 1) {
                            enemieNode.removeChild(enemieColumnNodes);
                        }
                    }
                }
            }
        }
        //Barriere Collision
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
    function invaderEnableMove() {
        allowMove = true;
    }
    function moveInvaders() {
        //Rect Position setzen
        for (let enemieColumnNodes of enemieNode.getChildren()) {
            for (let enemie of enemieColumnNodes.getChildren()) {
                enemie.setRectPosition();
            }
        }
        //Bewegen
        if (allowMove == true) {
            //Richtung
            if (down == true) {
                if (enemieNode.getChild(enemieNode.getChildren().length - 1).getChild(0)?.mtxLocal.translation.x >= 7.5) {
                    for (let enemieColumnNodes of enemieNode.getChildren()) {
                        for (let enemie of enemieColumnNodes.getChildren()) {
                            direction = "left";
                            for (let enemiePosCheck of enemieColumnNodes.getChildren()) {
                                if (enemiePosCheck.mtxLocal.translation.y < 3) {
                                    stopMovingDown = true;
                                }
                            }
                            if (!stopMovingDown) {
                                enemie.mtxLocal.translateY(-0.3);
                            }
                            allowMove = false;
                            down = false;
                        }
                    }
                }
                if (enemieNode.getChild(1)?.getChild(0).mtxLocal.translation.x <= -7.5) {
                    for (let enemieColumnNodes of enemieNode.getChildren()) {
                        for (let enemie of enemieColumnNodes.getChildren()) {
                            direction = "right";
                            for (let enemiePosCheck of enemieColumnNodes.getChildren()) {
                                if (enemiePosCheck.mtxLocal.translation.y < 3) {
                                    stopMovingDown = true;
                                }
                            }
                            if (!stopMovingDown) {
                                enemie.mtxLocal.translateY(-0.3);
                            }
                            allowMove = false;
                            down = false;
                        }
                    }
                }
            }
            //Bewegen
            if (allowMove == true) { //damit runter und seitlich nicht in einem passiert
                for (let enemieColumnNodes of enemieNode.getChildren()) {
                    for (let enemie of enemieColumnNodes.getChildren()) {
                        if (direction == "left") {
                            enemie.mtxLocal.translateX(-0.3);
                        }
                        else {
                            enemie.mtxLocal.translateX(0.3);
                        }
                        down = true;
                    }
                }
            }
            allowMove = false;
            fc.Time.game.setTimer(2500, 1, invaderEnableMove);
        }
    }
    //Mutterschiff Movement
    function mothershipMovementCheck() {
        if (enemieNode.getChild(0).mtxLocal.translation.x > 7.5)
            mothershipMoveRight = false;
        if (enemieNode.getChild(0).mtxLocal.translation.x < -7.5)
            mothershipMoveRight = true;
    }
    function update(_event) {
        let offset = speedCharacter * fc.Loop.timeFrameReal / 1000;
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])) {
            characterNode.mtxLocal.translateX(-offset);
        }
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])) {
            characterNode.mtxLocal.translateX(+offset);
        }
        //Shoot Player
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.SPACE])) {
            if (newProjectile == true) {
                let projectile = new L02_spaceInvaders.Projectile(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
                projectileNode.addChild(projectile);
                newProjectile = false;
                fc.Time.game.setTimer(reloadeTime, 1, checkProjectile);
            }
        }
        /*Invader Färben
        for (let enemieColumnNodes of enemieNode.getChildren()) {
            if (enemieColumnNodes.getChildren().length - 1 >= 0) {
                enemieColumnNodes.getChild(enemieColumnNodes.getChildren().length - 1).getComponent(fc.ComponentMaterial).clrPrimary = new fc.Color(1, 0, 1, 1);
            }
        }*/
        //Shoot Invader
        let shootingInvader = Math.round(Math.random() * ((enemieNode.getChildren().length - 1)) - 0.5) + 1;
        if (enemieNode.getChildren().length - 1 > 0) {
            if (enemieNode.getChild(shootingInvader).getChildren().length - 1 >= 0) {
                if (newInvaderProjectile == true) {
                    let projectile = new L02_spaceInvaders.Projectile(enemieNode.getChild(shootingInvader).getChild(enemieNode.getChild(shootingInvader).getChildren().length - 1).mtxLocal.translation.x, enemieNode.getChild(shootingInvader).getChild(enemieNode.getChild(shootingInvader).getChildren().length - 1).mtxLocal.translation.y - 0.8);
                    projectile.mtxLocal.rotateZ(180);
                    projectileNode.addChild(projectile);
                    newInvaderProjectile = false;
                    fc.Time.game.setTimer(700, 1, checkProjectileInvader);
                }
            }
        }
        //Move Projectile
        for (let projectile of projectileNode.getChildren()) {
            projectile.move();
            if (projectile.mtxLocal.translation.y > 9 || projectile.mtxLocal.translation.y < 0) {
                projectileNode.removeChild(projectile);
            }
        }
        mothershipMovementCheck();
        if (mothershipMoveRight)
            enemieNode.getChild(0).mtxLocal.translateX(0.2);
        else
            enemieNode.getChild(0).mtxLocal.translateX(-0.2);
        //Kollision Projektile / Invaders / Barriere
        collisionDetection();
        //Invaders Bewegen
        moveInvaders();
        viewport.draw();
    }
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=spaceInvaders.js.map