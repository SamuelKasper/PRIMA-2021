"use strict";
var L03_PhysicsGame;
(function (L03_PhysicsGame) {
    var f = FudgeCore;
    let root;
    let cmpAvatar;
    let viewport;
    let avatar;
    let speedAvatar = 3;
    let cmpCamera = new f.ComponentCamera();
    window.addEventListener("load", start);
    async function start(_event) {
        //Graph|2021-04-27T14:37:44.804Z|93489
        await FudgeCore.Project.loadResourcesFromHTML();
        FudgeCore.Debug.log("Project:", FudgeCore.Project.resources);
        root = FudgeCore.Project.resources["Graph|2021-04-27T14:37:44.804Z|93489"];
        createAvatar();
        createRigidbodies();
        cmpCamera.mtxPivot.translateX(0);
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateY(20);
        cmpCamera.mtxPivot.lookAt(f.Vector3.ZERO());
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
        let meshAvatar = new f.ComponentMesh(new f.MeshQuad("quad"));
        avatar.addComponent(meshAvatar);
        let matAvatar = new f.Material("white", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 0, 1, 1)));
        avatar.addComponent(new f.ComponentMaterial(matAvatar));
        avatar.addComponent(new f.ComponentTransform());
        avatar.mtxWorld.translateY(20);
        avatar.addComponent(cmpAvatar);
        avatar.addComponent(cmpCamera);
        console.log(avatar);
        root.appendChild(avatar);
    }
    function update() {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        moveAvatar();
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
        let offset = speedAvatar * f.Loop.timeFrameReal / 1000;
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.W])) {
            avatar.mtxLocal.translateY(-offset);
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A])) {
            avatar.mtxLocal.translateX(offset);
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.S])) {
            avatar.mtxLocal.translateY(offset);
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D])) {
            avatar.mtxLocal.translateX(-offset);
        }
    }
})(L03_PhysicsGame || (L03_PhysicsGame = {}));
//# sourceMappingURL=PhysicsGame.js.map