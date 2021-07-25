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
    camera.applyGravity = true;
    camera.lockedTarget = box;
    camera.radius = 20;
    camera.fov = 1.75
    camera.inputs.removeByType("FreeCameraMouseInput");
    camera.attachControl(canvas, true);

    // camera.setTarget(BABYLON.Vector3.Zero());
    // camera.keysUp = [];
    // camera.keysDown = [];
    // camera.keysLeft = [];
    // camera.keysRight = [];

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
    light.intensity = 0.7;
    
    let ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 1000, height: 1000});

    // Skybox
    var skybox = BABYLON.Mesh.CreateBox('skyBox', 5000.0, scene)
    var skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('//www.babylonjs.com/assets/skybox/TropicalSunnyDay', scene)
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
    skyboxMaterial.disableLighting = true
    skybox.material = skyboxMaterial

    return scene;
};

const init = () => {               
    
    engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false});
    if (!engine) throw 'engine should not be null.';


    scene = createScene(); 

    engine.runRenderLoop(() => {
        if (scene && scene.activeCamera) {


            scene.render();




        }});
};


////////////////////////////////////////////////////////////////////////////////////////////////////
window.addEventListener("resize", function () {
            engine.resize();
});
   
$(window).keydown((e) => {
    switch(e.code) {
        case 'KeyW' : scene.getMeshByName("box").position.z-=0.1; break;
        case 'KeyA' : scene.getMeshByName("box").position.x+=0.1; break;
        case 'KeyD' : scene.getMeshByName("box").position.x-=0.1; break;
        case 'KeyS' : scene.getMeshByName("box").position.z+=0.1; break;

    }
});

init();