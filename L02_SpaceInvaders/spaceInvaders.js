"use strict";
var L02_spaceInvaders;
(function (L02_spaceInvaders) {
    var fc = FudgeCore;
    window.addEventListener("load", init);
    let viewport = new fc.Viewport();
    let rootNode = new fc.Node("root");
    let characterNode = new fc.Node("character");
    let barrierNode = new fc.Node("barrier");
    let enemieNode = new fc.Node("enemie");
    function init(_event) {
        //Canvas holen und speichern
        const canvas = document.querySelector("canvas");
        //Camera erstellen und verschieben
        let comCamera = new fc.ComponentCamera();
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
    function createCharacter() {
        //Lokale Variablen
        let characterNodeTurret = new fc.Node("turret");
        /***characterNode***/
        //Mesh erzeugen
        let characterMesh = new fc.MeshQuad("characterMesh");
        //Material erzeugen
        let material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));
        let comMaterial = new fc.ComponentMaterial(material);
        //Material und Mesh an Node hängen
        characterNode.addComponent(comMaterial);
        characterNode.addComponent(new fc.ComponentMesh(characterMesh));
        //Mesh skalieren
        characterNode.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.3);
        /***characterNodeTurred***/
        //Turret an character hängen
        characterNode.addChild(characterNodeTurret);
        //Material hinzufügen
        let turretMaterial = new fc.ComponentMaterial(material);
        characterNodeTurret.addComponent(turretMaterial);
        //Mesh erzeugen
        let characterTurretMesh = new fc.MeshQuad("characterTurretMesh");
        characterNodeTurret.addComponent(new fc.ComponentMesh(characterTurretMesh));
        characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleX(0.2);
        characterNodeTurret.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.6);
    }
    function createBarrier() {
        //Mesh erzeugen
        let barrierMesh = new fc.MeshQuad("barrierMesh");
        //Material erzeugen
        let material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(0, 1, 0, 1)));
        //Position Barriere
        let posBarriere = 0;
        for (let i = 0; i < 5; i++) {
            let barriere = new fc.Node(`barrier-${i}`);
            barriere.addComponent(new fc.ComponentMesh(barrierMesh));
            barriere.addComponent(new fc.ComponentMaterial(material));
            barriere.getComponent(fc.ComponentMesh).mtxPivot.translateY(1.5);
            barriere.getComponent(fc.ComponentMesh).mtxPivot.scaleX(1.5);
            barriere.getComponent(fc.ComponentMesh).mtxPivot.translateX(-5 + posBarriere);
            posBarriere = posBarriere + 2.5;
            barrierNode.addChild(barriere);
        }
    }
    function createEnemie() {
        /*** Mutterschiff ***/
        //Mesh erzeugen
        let enemieBossMesh = new fc.MeshQuad("barrierMesh");
        //Material erzeugen
        let materialBoss = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 0, 0, 1)));
        //Node für Boss erzeugen
        let enemieBoss = new fc.Node("boss");
        enemieBoss.addComponent(new fc.ComponentMesh(enemieBossMesh));
        enemieBoss.addComponent(new fc.ComponentMaterial(materialBoss));
        //Skalierung Boss
        enemieBoss.getComponent(fc.ComponentMesh).mtxPivot.scaleX(2);
        enemieBoss.getComponent(fc.ComponentMesh).mtxPivot.scaleY(0.8);
        enemieBoss.getComponent(fc.ComponentMesh).mtxPivot.translateY(11);
        enemieNode.addChild(enemieBoss);
        /*** Kleine Gegner ***/
        //Mesh erzeugen
        let enemieMesh = new fc.MeshQuad("barrierMesh");
        //Material erzeugen
        let material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 0, 1)));
        //Gegner Eigenschaften
        let posxEnemie = 0;
        let posyEnemie = 0;
        for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
            posyEnemie += 1.5;
            posxEnemie = 0;
            for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
                let enemie = new fc.Node(`enemie-${rowIndex}`);
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
})(L02_spaceInvaders || (L02_spaceInvaders = {}));
//# sourceMappingURL=spaceInvaders.js.map