"use strict";
var L03_PhysicsGame;
(function (L03_PhysicsGame) {
    var f = FudgeCore;
    let root;
    let cmpAvatar;
    let viewport;
    let avatar;
    let cmpCamera = new f.ComponentCamera();
    let forward;
    let cube;
    let cmpCube;
    let ball;
    let cmpBall;
    let counter = 0;
    let grabbing = false;
    window.addEventListener("load", start);
    async function start(_event) {
        //Graph|2021-04-27T14:37:44.804Z|93489
        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        root = FudgeCore.Project.resources["Graph|2021-04-27T14:37:44.804Z|93489"];
        //cube 
        cube = new f.Node("Cube");
        cmpCube = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
        cube.addComponent(cmpCube);
        //ball
        ball = root.getChildrenByName("ball")[0];
        cmpBall = new f.ComponentRigidbody(0.2, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.SPHERE, f.PHYSICS_GROUP.DEFAULT);
        ball.addComponent(cmpBall);
        createAvatar();
        createRigidbodies();
        createBall();
        createCube();
        cmpCamera.mtxPivot.translateX(0);
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateY(10);
        cmpCamera.mtxPivot.lookAt(f.Vector3.ZERO());
        //first person
        //cmpCamera.mtxPivot.translateY(1);
        document.addEventListener("keyup", hndKeyRelease);
        let canvas = document.querySelector("canvas");
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Physics.adjustTransforms(root, true);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function createAvatar() {
        cmpAvatar = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
        cmpAvatar.restitution = 0.5;
        cmpAvatar.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpAvatar.friction = 1;
        avatar = new f.Node("Avatar");
        //let meshAvatar: f.ComponentMesh = new f.ComponentMesh(new f.MeshQuad("quad"));
        //avatar.addComponent(meshAvatar);
        //let matAvatar: f.Material = new f.Material("white", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0, 1, 1)));
        //avatar.addComponent(new f.ComponentMaterial(matAvatar));
        avatar.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(3))));
        avatar.addComponent(cmpAvatar);
        avatar.addComponent(cmpCamera);
        root.appendChild(avatar);
    }
    function createBall() {
        cmpBall.restitution = 0.5;
        cmpBall.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpBall.friction = 1;
    }
    function createCube() {
        cube.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1))));
        cmpCube.restitution = 0.5;
        cmpCube.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpCube.friction = 1;
        let meshCube = new f.ComponentMesh(new f.MeshCube("cube"));
        cube.addComponent(meshCube);
        let matCube = new f.Material("white", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0, 1, 1)));
        cube.addComponent(new f.ComponentMaterial(matCube));
        root.appendChild(cube);
    }
    function update() {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        moveAvatar();
        grabObject();
        viewport.draw();
        f.Physics.settings.debugDraw = true;
    }
    function createRigidbodies() {
        let level = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
        }
    }
    function moveAvatar() {
        let speed = 10;
        let rotate = 5;
        forward = avatar.mtxWorld.getZ();
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
            cmpAvatar.setVelocity(ƒ.Vector3.SCALE(forward, -speed));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S, ƒ.KEYBOARD_CODE.ARROW_DOWN])) {
            cmpAvatar.setVelocity(ƒ.Vector3.SCALE(forward, speed));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            cmpAvatar.rotateBody(ƒ.Vector3.Y(rotate));
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            cmpAvatar.rotateBody(ƒ.Vector3.Y(-rotate));
        }
    }
    function grabObject() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.F])) {
            let distance = f.Physics.raycast(cmpAvatar.getPosition(), forward, 2);
            console.log(distance.hit);
            if (distance.hit) {
                avatar.addChild(cube);
                grabbing = true;
            }
        }
    }
    function hndKeyRelease(_event) {
        if (_event.code == f.KEYBOARD_CODE.W)
            cmpAvatar.setVelocity(ƒ.Vector3.SCALE(forward, 0));
        if (_event.code == f.KEYBOARD_CODE.S)
            cmpAvatar.setVelocity(ƒ.Vector3.SCALE(forward, 0));
        if (_event.code == f.KEYBOARD_CODE.A)
            cmpAvatar.setVelocity(ƒ.Vector3.Y(0));
        if (_event.code == f.KEYBOARD_CODE.D)
            cmpAvatar.setVelocity(ƒ.Vector3.Y(0));
        if (_event.code == f.KEYBOARD_CODE.F) {
            if (grabbing) {
                counter++;
                if (counter >= 2) {
                    cmpCube.setPosition(cmpAvatar.getPosition());
                    root.addChild(cube);
                    counter = 0;
                    grabbing = false;
                }
            }
        }
    }
})(L03_PhysicsGame || (L03_PhysicsGame = {}));
//# sourceMappingURL=PhysicsGame.js.map