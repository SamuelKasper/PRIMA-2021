namespace L01_FirstFudge{
    import fc = FudgeCore;

    //starten wenn Seite mit laden fertig ist
    window.addEventListener("load", init);
    let viewport: fc.Viewport = new fc.Viewport();
    let node: fc.Node = new fc.Node("Test");
    
    //Wird ausgeführt wenn Seite mit Laden fertig ist.
    function init(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        //Transformationskomponente erzeugen um kasten zu verschieben
        node.addComponent(new fc.ComponentTransform);

        let mesh: fc.MeshQuad = new fc.MeshQuad("Quad");
        //kompontente "ComponentMensh" verbindet Knoten "node" und Ressource "mesh"
        node.addComponent(new fc.ComponentMesh(mesh));

        //material erzeugen: Name, shader erzeugt Pixel, Farbe
        let material: fc.Material = new fc.Material("Material", fc.ShaderUniColor, new fc.CoatColored(new fc.Color(1, 1, 1, 1)));
        let comMaterial: fc.ComponentMaterial = new fc.ComponentMaterial(material);
        node.addComponent(comMaterial);

        //mtx = matrix | Pivot matrix ist transformation gegenüber des Objektes - Welt matrix ist die transformation gegenüber der Welt
        console.log(node);

        //Kamera erstellen und verschieben
        let comCamera: fc.ComponentCamera = new fc.ComponentCamera();
        comCamera.mtxPivot.translateZ(3);
        comCamera.mtxPivot.rotateY(180);
        console.log(comCamera);

        //rechtshändiges koordinatensystem: z zu mir (vorne/hinten), x nach rechts/links, y nach oben/unten
        //viewport initialisieren
        viewport.initialize("Viewport", node, comCamera, canvas);
        viewport.draw();

        //Kamera nach vorne und um 180 grad drehen
        fc.Loop.start(fc.LOOP_MODE.TIME_REAL, 60);
        fc.Loop.addEventListener(fc.EVENT.LOOP_FRAME, update);
    }

    function update(_event: Event): void {
        ///um Mesh (weclhes am Knoten hängt) zu drehen
        let rotSpeed: number = 90 / 1000; //90 Grad pro Sek -> Frame rate unabhängig -> Zeitbasiert
        node.getComponent(fc.ComponentMesh).mtxPivot.rotateZ(rotSpeed * fc.Loop.timeFrameReal); 
        viewport.draw();
    }
}
