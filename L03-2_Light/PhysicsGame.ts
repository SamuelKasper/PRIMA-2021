namespace L03_PhysicsGame {
    import f = FudgeCore;

    let root: f.Graph;
    let cmpAvatar: f.ComponentRigidbody;
    let viewport: f.Viewport;

    window.addEventListener("load", start);
    async function start(_event: Event): Promise<void> {

        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        root = <f.Graph>FudgeCore.Project.resources["Graph|2021-04-27T14:37:44.804Z|93489"];

        createAvatar();
        createRigidbodies();
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.mtxPivot.translate(f.Vector3.ONE(20));
        cmpCamera.mtxPivot.lookAt(f.Vector3.ZERO());

        let canvas: HTMLCanvasElement = document.querySelector("canvas");
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        f.Physics.start(root);
        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }

    function createAvatar(): void {
        cmpAvatar = new f.ComponentRigidbody(0.1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
        cmpAvatar.restitution = 0.5;
        cmpAvatar.rotationInfluenceFactor = f.Vector3.ZERO();
        cmpAvatar.friction = 1;
        let avatar: f.Node = new f.Node("Avatar");
        avatar.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(f.Vector3.Y(3))));
        avatar.addComponent(cmpAvatar); 
        
        root.appendChild(avatar);
    }

    function update(): void {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
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
}