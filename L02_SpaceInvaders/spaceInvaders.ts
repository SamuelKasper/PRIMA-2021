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
    //Charakter
    let characterNode: Character;
    let speedCharacter: number = 1;
    //Projektile
    let projectileNode: fc.Node = new fc.Node("projectile");
    let newProjectile: Boolean  = true;
    let reloadeTime: number = 2000;
    
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
            posBarriere += 10;
            //zurücksetzten der reihenverschiebung
            posBarrierRow = 0;

            /*** Reihen erzeugen ***/
            for ( let row: number = 0; row < 5; row++) {
                //verschiebung nach rechts
                posBarrierRow += 1;
                //zurücksetzen der Höhe
                posBarrierColumn = 0;

                /*** Spalten erzeugen ***/
                for (let k: number = 0; k < 4; k++) {
                    let barriers: Barrier = new Barrier(posBarrierRow, posBarrierColumn, posBarriere); 
                    posBarrierColumn += 1;
                    //block an bariereNode anhängen
                    barrierNode.addChild(barriers);
                }
            }
        }
    }

    function createEnemie(): void {
        /*** Mutterschiff ***/
        let posxMothership: number = 0;
        let posyMothership: number = 11;

        //Klassenaufruf
        let mothership: Mothership = new Mothership(posxMothership, posyMothership);
        enemieNode.addChild(mothership);

        /*** Kleine Gegner ***/
        let posxEnemie: number = 0;
        let posyEnemie: number = 0; 

        for (let columnIndex: number = 0; columnIndex < 4; columnIndex++) {
            posyEnemie += 1.5;
            posxEnemie = 0;
            for (let rowIndex: number = 0; rowIndex < 10; rowIndex++) {
                //Klassenaufruf
                let name: string = "enemie: " + columnIndex + ", " + rowIndex;
                let enemie: Invader = new Invader(posxEnemie, posyEnemie, name);
                posxEnemie += 1.5;
                enemieNode.addChild(enemie);
            }
        }
    }

    //Erlaubt feuern eines neuen Projectiles 
    function checkProjectile(): void {
        newProjectile = true;
    }

    function update(_event: Event): void {
        let offset: number = speedCharacter * fc.Loop.timeFrameReal / 1000;
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.A, fc.KEYBOARD_CODE.ARROW_LEFT])) {
            characterNode.mtxLocal.translateX(-offset);
        }

        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.D, fc.KEYBOARD_CODE.ARROW_RIGHT])) {
            characterNode.mtxLocal.translateX(+offset);
        }

        //Als keydown event außerhalb der update
        if (fc.Keyboard.isPressedOne([fc.KEYBOARD_CODE.SPACE])) {
                if (newProjectile == true) {
                let projectile: Projectile  = new Projectile(characterNode.mtxLocal.translation.x, characterNode.mtxLocal.translation.y);
                projectileNode.addChild(projectile);
                newProjectile = false;
                fc.Time.game.setTimer(reloadeTime, 1, checkProjectile);
            }
        }

        for (let iProjectile of projectileNode.getChildren() as Projectile[]) {
            iProjectile.shot();
        }


        viewport.draw();
    }
}