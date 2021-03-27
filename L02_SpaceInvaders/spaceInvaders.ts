namespace L02_spaceInvaders {
    import fc = FudgeCore;

    window.addEventListener("load", init);
    let viewport: fc.Viewport = new fc.Viewport();
    let rootNode: fc.Node = new fc.Node("root");
    let characterNode: fc.Node = new fc.Node("character");
    let barrierNode: fc.Node = new fc.Node("barrier");
    let enemieNode: fc.Node = new fc.Node("enemie");

    function init(_event: Event): void {
        //Canvas holen und speichern
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        
        //Camera erstellen und verschieben
        let comCamera: fc.ComponentCamera = new fc.ComponentCamera();
        comCamera.mtxPivot.translateZ(15);
        comCamera.mtxPivot.translateY(4.6);
        comCamera.mtxPivot.rotateY(180);

        //Nodes an rootNode hängen
        rootNode.addChild(characterNode);
        rootNode.addChild(barrierNode);
        rootNode.addChild(enemieNode);

        createCharacter();
        createBarrier();
        createEnemie();

        //viewport initialisieren
        viewport.initialize("Viewport", rootNode, comCamera, canvas);
        viewport.draw();
    }

    function createCharacter(): void {
        //Lokale Variablen
        let characterNodeTurret: fc.Node = new fc.Node("turret");

        /***characterNode***/
        //Mesh erzeugen
        let characterMesh: fc.MeshQuad = new fc.MeshQuad("characterMesh");
        //Material erzeugen
        let material: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));
        let comMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(material);
        //Material und Mesh an Node hängen
        characterNode.addComponent(comMaterial);
        characterNode.addComponent(new fc.ComponentMesh(characterMesh));
        //Mesh skalieren
        characterNode.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.3);

        /***characterNodeTurred***/
        //Turret an character hängen
        characterNode.addChild(characterNodeTurret);
        //Material hinzufügen
        let turretMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(material);
        characterNodeTurret.addComponent(turretMaterial);
        //Mesh erzeugen
        let characterTurretMesh: fc.MeshQuad = new fc.MeshQuad("characterTurretMesh");
        characterNodeTurret.addComponent(new fc.ComponentMesh(characterTurretMesh));
        characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.2);
        characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
    }
    /*
    function createBarrier(): void {
        //Mesh erzeugen
        let barrierMesh: fc.MeshQuad = new fc.MeshQuad("barrierMesh");
        //Material erzeugen
        let material: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));
        //Position Barriere
        let posBarriere: number = 0;
        for (let i: number = 0; i < 5; i++) {
            let barriere: fc.Node = new fc.Node(`barrier-${i}`);
            barriere.addComponent(new fc.ComponentMesh(barrierMesh));
            barriere.addComponent(new fc.ComponentMaterial(material));
            barriere.getComponent(fc.ComponentMesh).mtxPivot.translateY(1.5);
            barriere.getComponent(fc.ComponentMesh).mtxPivot.scaleX(1.5);
            
            barriere.getComponent(fc.ComponentMesh).mtxPivot.translateX(-5 + posBarriere);
            posBarriere = posBarriere + 2.5;
            barrierNode.addChild(barriere);
        }
    }*/

    function createBarrier(): void {
        //Mesh erzeugen
        let barrierMesh: fc.MeshQuad = new fc.MeshQuad("barrierMesh");
        //Material erzeugen
        let material: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));

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
                    //Spalte erzeugen
                    let barrierBlock: fc.Node = new fc.Node(`barrier-${k}`);
                    barrierBlock.addComponent(new fc.ComponentMesh(barrierMesh));
                    barrierBlock.addComponent(new fc.ComponentMaterial(material));
                    //Breite & Höhe 0.3*4=1.2
                    barrierBlock.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.3);
                    barrierBlock.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.3);
                    
                    //Verschieben nach Y der Nächsten Barriere
                    barrierBlock.getComponent(fc.ComponentMesh).mtxPivot.translateY(7 - posBarrierColumn);
                    posBarrierColumn += 1;

                    //Verschieben nach X der Nächsten Barriere
                    barrierBlock.getComponent(fc.ComponentMesh).mtxPivot.translateX(-27 - posBarrierRow + posBarriere);
                    
                    //block an bariereNode anhängen
                    barrierNode.addChild(barrierBlock);
                }
            }
        }
    }

    function createEnemie(): void {
        /*** Mutterschiff ***/
        //Mesh erzeugen
        let enemieBossMesh: fc.MeshQuad = new fc.MeshQuad("barrierMesh");
        //Material erzeugen
        let materialBoss: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 1)));
        //Node für Boss erzeugen
        let enemieBoss: fc.Node = new fc.Node("boss");
        enemieBoss.addComponent(new fc.ComponentMesh(enemieBossMesh));
        enemieBoss.addComponent(new fc.ComponentMaterial(materialBoss));
        //Skalierung Boss
        enemieBoss.getComponent(fc.ComponentMesh).mtxPivot.scaleX(2);
        enemieBoss.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.8);
        enemieBoss.getComponent(fc.ComponentMesh).mtxPivot.translateY(11);
        enemieNode.addChild(enemieBoss);


        /*** Kleine Gegner ***/
        //Mesh erzeugen
        let enemieMesh: fc.MeshQuad = new fc.MeshQuad("barrierMesh");
        //Material erzeugen
        let material: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 0, 1)));
        //Gegner Eigenschaften
        let posxEnemie: number = 0;
        let posyEnemie: number = 0;
        for (let columnIndex: number = 0; columnIndex < 4; columnIndex++) {
            posyEnemie += 1.5;
            posxEnemie = 0;
            for (let rowIndex: number = 0; rowIndex < 10; rowIndex++) {
                let enemie: fc.Node = new fc.Node(`enemie-${rowIndex}`);
                enemie.addComponent(new fc.ComponentMesh(enemieMesh));
                enemie.addComponent(new fc.ComponentMaterial(material));
                //Skalierung Gegner
                enemie.getComponent(fc.ComponentMesh).mtxPivot.scaleX(1);
                enemie.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
                
                //Position Gegner
                enemie.getComponent(fc.ComponentMesh).mtxPivot.translateX(-7.5 + posxEnemie);
                enemie.getComponent(fc.ComponentMesh).mtxPivot.translateY(14.5 - posyEnemie);
                posxEnemie += 1.5;

                enemieNode.addChild(enemie);
            }
        }
    }

}