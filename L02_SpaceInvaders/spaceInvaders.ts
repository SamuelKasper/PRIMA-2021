namespace L02_spaceInvaders {
    import fc = FudgeCore;

    window.addEventListener("load", init);
    let viewport: fc.Viewport = new fc.Viewport();
    //Haupt Node
    let rootNode: fc.Node = new fc.Node("root");
    //Barriere
    let barrierNode: fc.Node = new fc.Node("barrier");
    //Invaders (+ Mutterschiff)
    let enemieNode: fc.Node = new fc.Node("enemie");
    let enemieColumnNode: fc.Node;
    //Charakter
    let characterNode: Character;
    let speedCharacter: number = 1;
    //Projektile
    let projectileNode: fc.Node = new fc.Node("projectile");
    let newProjectile: Boolean = true;
    let newInvaderProjectile: Boolean = true;
    let reloadeTime: number = 2000;
    //Invader Bewegen
    let allowMove: Boolean = true;
    let direction: String = "";
    let down: Boolean = true;
    let stopMovingDown: Boolean = false;
    let mothershipMoveRight: boolean = true;
    let state: GameState;

    function init(_event: Event): void {
        //Canvas holen und speichern
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        //Camera erstellen und verschieben
        let comCamera: fc.ComponentCamera = new fc.ComponentCamera();
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
        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, update);
        state = GameState.running;

    }

    function createCharacter(): void {
        characterNode = new Character();
        rootNode.addChild(characterNode);
    }

    function createBarrier(): void {
        //Position Barriere
        let posBarriere: number = 0; //verschiebung der großen Blöcke
        let posBarrierColumn: number = 0; //verschiebung nach y im großen Block
        let posBarrierRow: number = 0; //verschiebung nach x im großen Block

        /*** Barrieren Block erzeugen ***/
        for (let i: number = 0; i < 5; i++) {
            //verschiebung nach rechts
            posBarriere += 3;
            //zurücksetzten der reihenverschiebung
            posBarrierRow = 0;

            /*** Reihen erzeugen ***/
            for (let row: number = 0; row < 5; row++) {
                //verschiebung nach rechts
                posBarrierRow += 0.3;
                //zurücksetzen der Höhe
                posBarrierColumn = 0;

                /*** Spalten erzeugen ***/
                for (let k: number = 0; k < 4; k++) {
                    let barriers: Barrier = new Barrier(posBarrierRow, posBarrierColumn, posBarriere);
                    posBarrierColumn += 0.3;
                    //block an bariereNode anhängen
                    barrierNode.addChild(barriers);
                }
            }
        }
    }

    function createEnemie(): void {
        enemieNode.addComponent(new fc.ComponentTransform());

        /*** Mutterschiff ***/
        let posxMothership: number = 0;
        let posyMothership: number = 8.7;

        //Klassenaufruf
        enemieNode.addChild(new Mothership(posxMothership, posyMothership));

        /*** Kleine Gegner ***/
        let posxEnemie: number = 0;
        let posyEnemie: number = 0;

        for (let columnIndex: number = 0; columnIndex < 10; columnIndex++) {
            //Übergeordnete Spalten an denen die Invaders hängen
            enemieColumnNode = new fc.Node(`enemieColumnNode: ${columnIndex}`);
            enemieNode.addChild(enemieColumnNode);
            posxEnemie += 1.5;
            posyEnemie = 0;
            for (let rowIndex: number = 0; rowIndex < 4; rowIndex++) {
                //Klassenaufruf
                let name: string = "enemie: " + columnIndex + ", " + rowIndex;
                let enemie: Invader = new Invader(posxEnemie, posyEnemie, name);
                posyEnemie += 1;
                enemieColumnNode.addChild(enemie);
            }
        }
    }

    //Erlaubt feuern eines neuen Projectiles 
    function checkProjectile(): void {
        newProjectile = true;
    }

    function checkProjectileInvader(): void {
        newInvaderProjectile = true;
    }

    function collisionDetection(): void {
        //Mutterschiff Collision
        for (let projectile of projectileNode.getChildren() as Projectile[]) {
            let mothership: Mothership = enemieNode.getChild(0) as Mothership;
            if (projectile.checkCollision(mothership)) {
                state = GameState.over;
            }
        }

        //Enemie Collision
        for (let projectile of projectileNode.getChildren() as Projectile[]) {
            for (let enemieColumnNodes of enemieNode.getChildren()) {
                for (let enemie of enemieColumnNodes.getChildren() as Invader[]) {
                    if (projectile.checkCollision(enemie)) {
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
        for (let projectile of projectileNode.getChildren() as Projectile[]) {
            for (let barriere of barrierNode.getChildren() as Barrier[]) {
                if (projectile.checkCollision(barriere)) {
                    projectileNode.removeChild(projectile);
                    barrierNode.removeChild(barriere);
                }
            }
        }
    }

    function invaderEnableMove(): void {
        allowMove = true;
    }

    function moveInvaders(): void {
        //Rect Position setzen
        for (let enemieColumnNodes of enemieNode.getChildren()) {
            for (let enemie of enemieColumnNodes.getChildren() as Invader[]) {
                enemie.setRectPosition();
            }
        }

        //Bewegen
        if (allowMove == true) {
            //Richtung
            if (down == true) {

                if (enemieNode.getChild(enemieNode.getChildren().length - 1).getChild(0)?.mtxLocal.translation.x >= 7.5) {
                    for (let enemieColumnNodes of enemieNode.getChildren()) {
                        for (let enemie of enemieColumnNodes.getChildren() as Invader[]) {
                            direction = "left";
                            for (let enemiePosCheck of enemieColumnNodes.getChildren() as Invader[]) {
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
                        for (let enemie of enemieColumnNodes.getChildren() as Invader[]) {
                            direction = "right";
                            for (let enemiePosCheck of enemieColumnNodes.getChildren() as Invader[]) {
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
                    for (let enemie of enemieColumnNodes.getChildren() as Invader[]) {
                        if (direction == "left") {
                            enemie.mtxLocal.translateX(-0.3);
                        } else {
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
    function mothershipMovementCheck(): void {
        if (enemieNode.getChild(0)?.mtxLocal.translation.x > 7.5)
            mothershipMoveRight = false;

        if (enemieNode.getChild(0)?.mtxLocal.translation.x < -7.5)
            mothershipMoveRight = true;
    }

    function update(_event: Event): void {
        if (state == GameState.running) {
            let offset: number = speedCharacter * fc.Loop.timeFrameReal / 1000;
            if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])) {
                characterNode.mtxLocal.translateX(-offset);
            }

            if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])) {
                characterNode.mtxLocal.translateX(+offset);
            }

            //Shoot Player
            if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.SPACE])) {
                if (newProjectile == true) {
                    let projectile: Projectile = new Projectile(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
                    projectileNode.addChild(projectile);
                    newProjectile = false;
                    fc.Time.game.setTimer(reloadeTime, 1, checkProjectile);
                }
            }

            //Shoot Invader
            let shootingInvader: number = Math.round(Math.random() * ((enemieNode.getChildren().length - 1)) - 0.5) + 1;
            if (enemieNode.getChildren().length - 1 > 0) {
                if (enemieNode.getChild(shootingInvader).getChildren().length - 1 >= 0) {
                    if (newInvaderProjectile == true) {
                        let projectile: Projectile = new Projectile(enemieNode.getChild(shootingInvader).getChild(enemieNode.getChild(shootingInvader).getChildren().length - 1).mtxLocal.translation.x, enemieNode.getChild(shootingInvader).getChild(enemieNode.getChild(shootingInvader).getChildren().length - 1).mtxLocal.translation.y - 0.8);
                        projectile.mtxLocal.rotateZ(180);
                        projectileNode.addChild(projectile);
                        newInvaderProjectile = false;
                        fc.Time.game.setTimer(700, 1, checkProjectileInvader);
                    }
                }
            }

            //Move Projectile
            for (let projectile of projectileNode.getChildren() as Projectile[]) {
                projectile.move();
                if (projectile.mtxLocal.translation.y > 9 || projectile.mtxLocal.translation.y < 0) {
                    projectileNode.removeChild(projectile);
                }
            }

            mothershipMovementCheck();
            if (mothershipMoveRight) {
                let mothership: Mothership = enemieNode.getChild(0) as Mothership;
                mothership.mtxLocal.translateX(0.2);
                mothership.setRectPosition();
            } else {
                let mothership: Mothership = enemieNode.getChild(0) as Mothership;
                mothership.mtxLocal.translateX(-0.2);
                mothership.setRectPosition();
            }

            //Kollision Projektile / Invaders / Barriere
            collisionDetection();

            //Invaders Bewegen
            moveInvaders();

            viewport.draw();
        }
    }

}