"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var fc = FudgeCore;
    //starten wenn Seite mit laden fertig ist
    window.addEventListener("load", init);
    //Wird ausgeführt wenn Seite mit Laden fertig ist.
    function init(_event) {
        let node = new fc.Node("Test");
        const canvas = document.querySelector("canvas");
        let mesh = new fc.MeshQuad("Quad");
        //kompontente "ComponentMensh" verbindet Knoten "node" und Ressource "mesh"
        node.addComponent(new fc.ComponentMesh(mesh));
        //material erzeugen: Name, shader erzeugt Pixel, Farbe
        let material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 1, 1)));
        let comMaterial = new fc.ComponentMaterial(material);
        node.addComponent(comMaterial);
        //mtx = matrix | Pivot matrix ist transformation gegenüber des Objektes - Welt matrix ist die transformation gegenüber der Welt
        console.log(node);
        let comCamera = new fc.ComponentCamera();
        comCamera.mtxPivot.translateZ(3);
        comCamera.mtxPivot.rotateY(180);
        console.log(comCamera);
        //rechtshändiges koordinatensystem: z zu mir (vorne/hinten), x nach rechts/links, y nach oben/unten
        let viewport = new fc.Viewport();
        viewport.initialize("Viewport", node, comCamera, canvas);
        viewport.draw();
        //Kamera nach vorne und um 180 grad drehen
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Test.js.map