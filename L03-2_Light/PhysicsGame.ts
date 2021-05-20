namespace L03_PhysicsGame {
    import f = FudgeCore;

    let root: f.Graph;
    let cmpAvatar: f.ComponentRigidbody;
    let viewport: f.Viewport;
    let avatar: f.Node;
    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    let forward: ƒ.Vector3;

    let cube: f.Node;
    let cmpCube: f.ComponentRigidbody;

    let ball: f.Node;
    let cmpBall: f.ComponentRigidbody;

    let pyramide: f.Node;
    let cmpPyramide: f.ComponentRigidbody;

    let counter: number = 0;
    let grabbing: boolean = false;
    let cmpAudio: f.ComponentAudio;
    let ctrRotation: f.Control = new f.Control("AvatarRot", -0.1, f.CONTROL_TYPE.PROPORTIONAL);
    ctrRotation.setDelay(100);

    window.addEventListener("load", start);

    //ScriptComponentRot
    export class ComponentScriptTest extends f.ComponentScript {
        constructor() {
            //construktor der superklasse aufrufen
            super();
            f.Time.game.setTimer(100, 0, this.hndTimer);
        }

        public hndTimer = (_event: f.EventTimer): void => {
            console.log("rotate");
            let body: f.ComponentRigidbody = this.getContainer().getComponent(f.ComponentRigidbody);
            body.rotateBody(f.Vector3.Y(5));
        }
    }//ScriptComponentRot End

    //ScriptComponentJump
    export class ComponentScriptJump extends f.ComponentScript {
        constructor() {
            //construktor der superklasse aufrufen
            super();
            f.Time.game.setTimer(2000, 0, this.hndTimer);
        }

        public hndTimer = (_event: f.EventTimer): void => {
            let body: f.ComponentRigidbody = this.getContainer().getComponent(f.ComponentRigidbody);
            if (f.Random.default.getRangeFloored(0, 1) == 0) {
                body.applyLinearImpulse(f.Vector3.Y(5));
            }
        }
    }//ScriptComponentJump End

    async function start(_event: Event): Promise<void> {
        //Graph|2021-04-27T14:37:44.804Z|93489
        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        root = <f.Graph>FudgeCore.Project.resources["Graph|2021-04-27T14:37:44.804Z|93489"];

        createAvatar();
        createRigidbodies();
        createBall();
        createCube();

        //first person
        cmpCamera.mtxPivot.translateY(1);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.mtxPivot.rotateX(5);


        document.addEventListener("keyup", hndKeyRelease);

        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.addEventListener("mousemove", hndMouse);

        //Audio
        let audioTetris: f.Audio = new f.Audio("Audio/tetris.mp3");
        cmpAudio = new f.ComponentAudio(audioTetris, true, true);
        cube.addComponent(cmpAudio);

        //Viewport
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Physics.adjustTransforms(root, true);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        Hud.start();
        f.Loop.start();
    }

    function hndMouse(_event: MouseEvent): void {
        ctrRotation.setInput(_event.movementX);
    }

    function createAvatar(): void {
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

    function createBall(): void {
        cmpBall.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpBall.restitution = 0.8;
        cmpBall.friction = 2.5;
    }

    function createCube(): void {
        //cube stuff
        cube.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(1, 1, 3))));
        cmpCube.restitution = 0.5;
        cmpCube.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpCube.friction = 1;

        let meshCube: f.ComponentMesh = new f.ComponentMesh(new f.MeshCube("cube"));
        cube.addComponent(meshCube);
        let matCube: f.Material = new f.Material("white", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0, 1, 1)));
        cube.addComponent(new f.ComponentMaterial(matCube));

        root.appendChild(cube);
    }

    function update(): void {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        moveAvatar();
        moveAvatarWithMouse(ctrRotation.getOutput());
        //ctrRotation.setInput(0);
        isGrabbing();
        viewport.draw();
        f.Physics.settings.debugDraw = true;
    }

    function isGrabbing(): void {
        if (grabbing) {
            f.AudioManager.default.listenTo(cube);
            //cmpAudio.play(true);
        } else {
            f.AudioManager.default.listenTo(ball);
            //cmpAudio.play(false);
        }
    }

    function createRigidbodies(): void {
        let level: f.Node = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigidbody: f.ComponentRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
        }
        //Moveables
        let movable: f.Node = root.getChildrenByName("Movable")[0];
        //cube 
        cube = new f.Node("Cube");
        cmpCube = new f.ComponentRigidbody(1, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
        cube.addComponent(cmpCube);
        
        //ball
        ball = movable.getChildrenByName("ball")[0];
        cmpBall = new f.ComponentRigidbody(1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.SPHERE, f.PHYSICS_GROUP.DEFAULT);
        ball.addComponent(new ComponentScriptJump);
        ball.addComponent(cmpBall);
        
        //pyramid
        pyramide = movable.getChildrenByName("Pyramide")[0];
        cmpPyramide = new f.ComponentRigidbody(1, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.PYRAMID, f.PHYSICS_GROUP.DEFAULT);
        cmpPyramide.restitution = 0.8;
        cmpPyramide.friction = 2.5;
        //script componente
        pyramide.addComponent(new ComponentScriptTest);
        pyramide.addComponent(cmpPyramide);
    }

    function moveAvatarWithMouse(_rotation: number): void {
        avatar.mtxLocal.rotateY(_rotation);
    }

    function moveAvatar(): void {
        let speed: number = 10;
        let rotate: number = 3;
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

    function grabObject(): void {
        /*Abstand zwischen spieler und Objekt
        let distance: f.Vector3 = f.Vector3.DIFFERENCE(cmpAvatar.getPosition(), cmpCube.getPosition());
        console.log(distance.magnitude);*/
        forward.z = -forward.z;
        forward.x = -forward.x;
        forward.y = - forward.y;
        let rayhit: f.RayHitInfo = f.Physics.raycast(cmpAvatar.getPosition(), forward, 3);
        if (rayhit.hit) {
            cmpCube.physicsType = f.PHYSICS_TYPE.KINEMATIC;
            cube.mtxLocal.set(f.Matrix4x4.TRANSLATION(f.Vector3.Z(-1.5)));
            avatar.addChild(cube);
            grabbing = true;
        }

        gameState.hits++;
    }

    function hndKeyRelease(_event: KeyboardEvent): void {
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



}