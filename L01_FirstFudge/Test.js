"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var fc = FudgeCore;
    //starten wenn Seite mit laden fertig ist
    window.addEventListener("load", init);
    let viewport = new fc.Viewport();
    let node = new fc.Node("Test");
    //Wird ausgeführt wenn Seite mit Laden fertig ist.
    function init(_event) {
        const canvas = document.querySelector("canvas");
        //Transformationskomponente erzeugen um kasten zu verschieben
        node.addComponent(new fc.ComponentTransform);
        let mesh = new fc.MeshQuad("Quad");
        //kompontente "ComponentMensh" verbindet Knoten "node" und Ressource "mesh"
        node.addComponent(new fc.ComponentMesh(mesh));
        //material erzeugen: Name, shader erzeugt Pixel, Farbe
        let material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 1, 1)));
        let comMaterial = new fc.ComponentMaterial(material);
        node.addComponent(comMaterial);
        //mtx = matrix | Pivot matrix ist transformation gegenüber des Objektes - Welt matrix ist die transformation gegenüber der Welt
        console.log(node);
        //Kamera erstellen und verschieben
        let comCamera = new fc.ComponentCamera();
        comCamera.mtxPivot.translateZ(3);
        comCamera.mtxPivot.rotateY(180);
        console.log(comCamera);
        //rechtshändiges koordinatensystem: z zu mir (vorne/hinten), x nach rechts/links, y nach oben/unten
        //viewport initialisieren
        viewport.initialize("Viewport", node, comCamera, canvas);
        viewport.draw();
        //Kamera nach vorne und um 180 grad drehen
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL, 60);
        fc.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        ///um Mesh (weclhes am Knoten hängt) zu drehen
        let rotSpeed = 90 / 1000; //90 Grad pro Sek -> Frame rate unabhängig -> Zeitbasiert
        node.getComponent(fc.ComponentMesh).mtxPivot.rotateZ(rotSpeed * fc.Loop.timeFrameReal);
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Test.js.map