namespace L03_PhysicsGame {
    import f = FudgeCore;

    let root: f.Graph;
    let cmpAvatar: f.ComponentRigidbody;
    let viewport: f.Viewport;
    let avatar: f.Node;
    let speedAvatar: number = 3;

    window.addEventListener("load", start);
    async function start(_event: Event): Promise<void> {
        //Graph|2021-04-27T14:37:44.804Z|93489
        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        root = <f.Graph>FudgeCore.Project.resources["Graph|2021-04-27T14:37:44.804Z|93489"];

        createAvatar();
        createRigidbodies();
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.mtxPivot.translateX(0);
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateY(20);
        cmpCamera.mtxPivot.lookAt(f.Vector3.ZERO());

        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Physics.start(root);
        f.Physics.adjustTransform(root, true);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }

    function createAvatar(): void {
        cmpAvatar = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
        cmpAvatar.restitution = 0.5;
        cmpAvatar.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpAvatar.friction = 1;
        avatar = new f.Node("Avatar");

        let meshAvatar: f.ComponentMesh = new f.ComponentMesh(new f.MeshQuad("quad"));
        avatar.addComponent(meshAvatar);
        let matAvatar: f.Material = new f.Material("white", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0, 1, 1)));
        avatar.addComponent(new f.ComponentMaterial(matAvatar));
        avatar.addComponent(new f.ComponentTransform());
        avatar.mtxWorld.translateY(20);

        avatar.addComponent(cmpAvatar);
        console.log(avatar);
        root.appendChild(avatar);
    }

    function update(): void {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        moveAvatar();
        viewport.draw();
        f.Physics.settings.debugDraw = true;
    }

    function createRigidbodies(): void {
        let level: f.Node = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigidbody: f.ComponentRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigidbody);
        }
    }

    function moveAvatar(): void {
        let offset: number = speedAvatar * f.Loop.timeFrameReal / 1000;
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.W])) {
            avatar.mtxLocal.translateY(offset);
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A])) {
            avatar.mtxLocal.translateX(-offset);
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.S])) {
            avatar.mtxLocal.translateY(-offset);
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D])) {
            avatar.mtxLocal.translateX(offset);
        }
    }
}