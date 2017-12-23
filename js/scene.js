window.addEventListener('load', init, false);

var site;

function resetSite() {
    site = {
        status: "load",
        ogX: 0,
        ogY: 0,
        ogZ: 0,
        sceneX: .8,
        sceneY: -0.5,
        sceneZ: -15,
    }
}

function init(event) {

    resetSite();

    document.addEventListener('mousemove', handleMouseMove, false);

    createScene();
    createLights();

    createDesert();

    loop();

}

var scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container, ogX, ogY, ogZ, controls;

function createScene() {
    HEIGHT = window.document.documentElement.clientHeight;
    WIDTH = window.document.documentElement.clientWidth;

    scene = new THREE.Scene();

    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 0.1;
    farPlane = 10000;

    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );

    controls = new THREE.DeviceOrientationControls( camera );


    camera.rotation.order = 'YXZ';
    camera.position.x = site.ogX;
    camera.position.y = site.ogY;
    camera.position.z = site.ogZ;
    //camera.rotation.x = -Math.PI/2.4;

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false


    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('myCanvas');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);
}

function handleWindowResize() {
    HEIGHT = window.document.documentElement.clientHeight;
    WIDTH = window.document.documentElement.clientWidth;
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}

var hemisphereLight, shadowLight;

function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x962132, .7);
    shadowLight = new THREE.SpotLight(0xffffff, 4);
    shadowLight.position.set(0, 20, 5);
    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -50;
    shadowLight.shadow.camera.right = 50;
    shadowLight.shadow.camera.top = 50;
    shadowLight.shadow.camera.bottom = -50;
    shadowLight.shadow.camera.near = .1;
    shadowLight.shadow.camera.far = 100;

    shadowLight.shadow.mapSize.width = 50;
    shadowLight.shadow.mapSize.height = 50;


    scene.add(hemisphereLight);
    scene.add(shadowLight);

}

var loader = new THREE.JSONLoader();

var desert;

function createDesert() {
    loader.load("models/desert.json",
        function(geometry, materials) {
            var material = new THREE.MeshFaceMaterial(materials);
            desert = new THREE.Mesh(geometry, material);
            desert.rotation.set(0, -Math.PI / 2, 0);
            desert.position.set(site.sceneX, site.sceneY, site.sceneZ);
            desert.scale.set(5,5,5);
            desert.traverse(function(node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            desert.castShadow = true;
            desert.recieveShadow = true;
            scene.add(desert);
        });

}

var mousePos = { x: 0, y: 0 };

function handleMouseMove(event) {
    var tx = -1 + (event.clientX / WIDTH) * 2;
    var ty = 1 - (event.clientY / HEIGHT) * 2;
    mousePos = { x: tx, y: ty };
}

function updatePlane() {
    var r = .6;
    var targetX = normalize(mousePos.x, -1, 1, -r, r);
    var targetY = normalize(mousePos.y, -1, 1, -r, r);
    camera.rotation.y = site.ogX - targetX; // left right
    camera.rotation.x = site.ogY + targetY; // left right
}

function normalize(v, vmin, vmax, tmin, tmax) {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;
}

function loop(time) {

    renderer.render(scene, camera);

    updatePlane();

    controls.update();

    requestAnimationFrame(loop);
};
