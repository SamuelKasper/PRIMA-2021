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
    let cmpAudio;
    let ctrRotation = new f.Control("AvatarRot", -0.1, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(100);
    window.addEventListener("load", start);
    //ScriptComponent
    class ComponentScriptTest extends f.ComponentScript {
        constructor() {
            super();
            this.hndTimer = (_event) => {
                let body = this.getContainer().getComponent(f.ComponentRigidbody);
                if (f.Random.default.getRangeFloored(0, 5) == 0) {
                    body.applyLinearImpulse(f.Vector3.Y(5));
                }
            };
            console.log("test create");
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndComponentAdd);
            f.Time.game.setTimer(1000, 0, this.hndTimer);
        }
        hndComponentAdd(_event) {
            console.log("compAdd");
            //this.getContainer().addEventListener(f.EVENT.RENDER_PREPARE, (_event: Event): void => console.log("render"));
        }
    } //ScriptComponent End
    L03_PhysicsGame.ComponentScriptTest = ComponentScriptTest;
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
        //first person
        cmpCamera.mtxPivot.translateY(1);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.rotateX(5);
        document.addEventListener("keyup", hndKeyRelease);
        let canvas = document.querySelector("canvas");
        canvas.addEventListener("mousemove", hndMouse);
        //Audio
        let audioTetris = new f.Audio("Audio/tetris.mp3");
        cmpAudio = new f.ComponentAudio(audioTetris, true, true);
        cube.addComponent(cmpAudio);
        //Viewport
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Physics.adjustTransforms(root, true);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function hndMouse(_event) {
        ctrRotation.setInput(_event.movementX);
    }
    function createAvatar() {
        cmpAvatar = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
        cmpAvatar.restitution = 0.5;
        cmpAvatar.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpAvatar.friction = 1;
        avatar = new f.Node("Avatar");
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
        //script componente
        cube.addComponent(new ComponentScriptTest);
        //cube stuff
        cube.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(1, 1, 3))));
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
        moveAvatarWithMouse(ctrRotation.getOutput());
        //ctrRotation.setInput(0);
        isGrabbing();
        viewport.draw();
        f.Physics.settings.debugDraw = true;
    }
    function isGrabbing() {
        if (grabbing) {
            f.AudioManager.default.listenTo(cube);
            //cmpAudio.play(true);
        }
        else {
            f.AudioManager.default.listenTo(ball);
            //cmpAudio.play(false);
        }
    }
    function createRigidbodies() {
        let level = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
        }
    }
    function moveAvatarWithMouse(_rotation) {
        avatar.mtxLocal.rotateY(_rotation);
    }
    function moveAvatar() {
        let speed = 10;
        let rotate = 3;
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
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.F])) {
            grabObject();
        }
    }
    function grabObject() {
        /*Abstand zwischen spieler und Objekt
        let distance: f.Vector3 = f.Vector3.DIFFERENCE(cmpAvatar.getPosition(), cmpCube.getPosition());
        console.log(distance.magnitude);*/
        forward.z = -forward.z;
        forward.x = -forward.x;
        forward.y = -forward.y;
        let rayhit = f.Physics.raycast(cmpAvatar.getPosition(), forward, 3);
        if (rayhit.hit) {
            cmpCube.physicsType = f.PHYSICS_TYPE.KINEMATIC;
            cube.mtxLocal.set(f.Matrix4x4.TRANSLATION(f.Vector3.Z(-1.5)));
            avatar.addChild(cube);
            grabbing = true;
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
                    cmpCube.physicsType = f.PHYSICS_TYPE.DYNAMIC;
                    root.addChild(cube);
                    counter = 0;
                    grabbing = false;
                }
            }
        }
    }
})(L03_PhysicsGame || (L03_PhysicsGame = {}));
//# sourceMappingURL=PhysicsGame.js.map