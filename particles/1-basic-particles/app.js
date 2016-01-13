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

  createSprites();

  document.getElementById("webgl-container").appendChild(renderer.domElement);

  render();
}

function createSprites() {
  var material = new THREE.SpriteMaterial();
  for (var x = -10; x < 10; x++) {
    for (var y = -10; y < 10; y++) {
      var sprite = new THREE.Sprite(material);
      sprite.position.set(x * 10, y * 10, 0);
      scene.add(sprite);
      particles.push(sprite);
    }
  }

}

function render() {
  for (var x = 0; x < particles.length; x++) {
    particles[x].position.z = controls.zDist;
  }
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


/////////////////
// Controls
/////////////

function initControls() {
	controls = new function () {
			this.zDist = 10;
  };

  var gui = new dat.GUI();
  gui.add(controls, 'zDist', 1, 1000);
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