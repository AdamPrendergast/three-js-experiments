var scene, camera, renderer, controls;
var particles = [];

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

  spawnParticles();

  document.getElementById("webgl-container").appendChild(renderer.domElement);

  render();
}

function spawnParticles() {
  for (var x = 0; x < controls.particleCount - particles.length; x++) {
    var xPos = (Math.random() * controls.stageWidth) - (controls.stageWidth/2);
    var yPos = controls.stageWidth;
    var particle = new Particle(xPos, yPos, scene);
    particles.push(particle);
  }
}

function cleanupParticles() {
  for (var x = 0; x < particles.length; x++) {
    var p = particles[x];
    if (p.instance.position.y < -controls.stageHeight) {
      p.destroy(scene);
      var index = particles.indexOf(p);
      if (index > -1) {
        particles = particles.splice(index, 1);
      }
    }
  }
}

function render() {
  spawnParticles();
  for (var x = 0; x < particles.length; x++) {
    particles[x].moveDown();
  }
  cleanupParticles();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


/////////////////
// Controls
/////////////

function initControls() {
	controls = new function () {
			this.particleCount = 100;
      this.stageWidth = 200;
      this.stageHeight = 100;
  };

  var gui = new dat.GUI();
  gui.add(controls, 'particleCount', 1, 1000);
  gui.add(controls, 'stageWidth', 100, 800);
  gui.add(controls, 'stageHeight', 100, 800);
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