// Variables

let container, camera, scene, renderer, model;



function init() {
    container = document.querySelector('.scene');

    // Create a scene
    scene = new THREE.Scene();
    
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 10000;

    // Create a camera
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 4500);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Hemisphere light
    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemiLight);

    // Create a renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add the renderer to the DOM
    container.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);

    //  Load model
    let loader = new THREE.GLTFLoader();
    loader.load('model/robot/scene.gltf', function(gltf) {
        model = gltf.scene;
        scene.add(model);
        model = gltf.scene.children[0];
        // renderer.render(scene, camera);
    })
    // loader.load('./model/ground/scene.gltf', function(gltf) {
    //     // ground = gltf.scene;
    //     ground = gltf.scene.children[0];
    //     scene.add(ground);
    // })
    renderer.render(scene, camera);
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    model.rotation.z += 0.005;
    renderer.render(scene, camera);
}

init();

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);