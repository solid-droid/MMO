let canvas;
let engine = null;
let scene = null;

canvas = document.getElementById("renderCanvas");

const createScene =  () => {
    let scene = new BABYLON.Scene(engine);
    
    const box = BABYLON.MeshBuilder.CreateBox("box", {height: 4, width: 4, depth: 4});
    box.position.y = 4;
    box.enableEdgesRendering(); 
    box.edgesWidth = 4.0;
    box.edgesColor = new BABYLON.Color4(0, 0, 1, 1);

    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {height: 4, width: 4, depth: 4});
    box2.position.y = 4;
    box2.position.x = 5;
    box2.enableEdgesRendering(); 
    box2.edgesWidth = 4.0;
    box2.edgesColor = new BABYLON.Color4(0, 0, 1, 1);


    let camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(45, 25, 50));
    camera.lockedTarget = box;
    camera.radius = 20;
    camera.attachControl(canvas, true);

    // camera.setTarget(BABYLON.Vector3.Zero());
    // camera.keysUp = [];
    // camera.keysDown = [];
    // camera.keysLeft = [];
    // camera.keysRight = [];

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    light.intensity = 0.7;
    
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 1000, height: 1000});

    return scene;
};

const init = () => {               
    
    engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});
    if (!engine) throw 'engine should not be null.';


    scene = createScene(); 

    scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "a":
                    case "A":
                        scene.getMeshByName("box").position.x += 0.1;
                    break
                    case "d":
                    case "D":
                        scene.getMeshByName("box").position.x -= 0.1;
                    break
                    case "w":
                    case "W":
                        scene.getMeshByName("box").position.z -= 0.1;
                    break
                    case "s":
                    case "S":
                        scene.getMeshByName("box").position.z += 0.1;
                    break
                }
			break;
		}
	});

    engine.runRenderLoop(() => {
        if (scene && scene.activeCamera) {


            scene.render();




        }});
};


////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("resize", function () {
            engine.resize();
});
   
init();