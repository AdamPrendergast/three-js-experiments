// Following Nature of Code - Chapter 4: Particle Systems

var scene, camera, renderer, controls;
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

  document.getElementById("webgl-container").appendChild(renderer.domElement);

  particleSystem = new ParticleSystem(scene);

  render();
}

function render() {
  particleSystem.run();
  particleSystem.emitParticles();
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

/////////////////
// Controls
/////////////

function initControls() {
	controls = new function () {
			this.lifeSpan = 255;
      this.emitRate = 1;
  };

  var gui = new dat.GUI();
  gui.add(controls, 'lifeSpan', 10, 3000);
  gui.add(controls, 'emitRate', 0, 20);
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