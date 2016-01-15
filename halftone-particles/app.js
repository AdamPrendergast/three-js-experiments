// setup
var scene, camera, renderer, controls;
var canvas = document.getElementById("webgl-container");
// mouse position
var mouse = new THREE.Vector3();
var mouseX = 0;
var mouseY = 0;
var raycaster = new THREE.Raycaster();
var depthMaterial = new THREE.MeshDepthMaterial();
// actors
var particleSystem;

function init() {

	var stats = initStats();
	initControls();

	// create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 500;

  // create a render and set the size
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);

  canvas.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onMouseMove, false);

  particleSystem = new ParticleSystem(scene);
  particleSystem.createParticlesAtSingularity();
  particleSystem.moveRandom();

  render();
}

function render() {
  //particleSystem.moveTo(mouseX, mouseY);
  particleSystem.run();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


/////////////////
// Helpers
/////////////

function randomCoord(multiplier) {
  return (Math.random()-0.5) * multiplier;
}

function randomVector() {
  return new THREE.Vector3(randomCoord(100), randomCoord(100), 0);
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function onMouseMove(event) {
  mouseX = (event.clientX - (window.innerWidth / 2)) / 50;
  mouseY = (event.clientY - (window.innerHeight / 2)) / 50;
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  var vector = new THREE.Vector3();
  vector.set(
      (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1,
      0.5);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  mouse.copy(pos);
}

/////////////////
// Controls
/////////////

function initControls() {
	controls = new function () {
			// this.lifeSpan = 255;
  };

  var gui = new dat.GUI();
  // gui.add(controls, 'lifeSpan', 10, 3000);
}


/////////////////
// Stats
/////////////

function initStats() {

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
}
