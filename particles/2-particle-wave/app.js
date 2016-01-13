var scene, camera, renderer, controls;
var particles = [];
var lowerParticleCount = -10;
var upperParticleCount = 10;
var particleCountInRow = upperParticleCount - lowerParticleCount;
var count = 0;
var spacing = 10;

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
  for (var x = lowerParticleCount; x < upperParticleCount; x++) {
    for (var y = lowerParticleCount; y < upperParticleCount; y++) {
      var sprite = new THREE.Sprite(material);
      sprite.position.set(x * spacing, y * spacing, 0);
      scene.add(sprite);
      particles.push(sprite);
    }
  }
}


function processWave() {
  var particleCount = 0;
  for (var x = 0; x < particleCountInRow; x++) {
    for (var y = 0; y < particleCountInRow; y++) {
      var particle = particles[particleCount];
      //particle.position.y = ( Math.sin( ( x + count ) * 0.3 ) * 50 ) + ( Math.sin( ( x + count ) * 0.5 ) * 50 );
      particle.scale.x = particle.scale.y = ( Math.sin( ( x + count ) * 0.3 ) + 1 ) * 4 + ( Math.sin( ( y + count ) * 0.5 ) + 1 ) * 4;
      particleCount++;
      count++;
   }
  }
}

function render() {
  processWave();
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