var scene, camera, renderer, controls;
var sphere;

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
  renderer.setClearColor(new THREE.Color(0xEEEEEE));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // sphere
  var geometry = new THREE.SphereGeometry( 5, 32, 32 );
	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );


  document.getElementById("webgl-container").appendChild(renderer.domElement);

  render();
}

function render() {
	sphere.scale.x = controls.sphereRadius;
	sphere.scale.y = controls.sphereRadius;
	sphere.scale.z = controls.sphereRadius;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}


/////////////////
// Controls
/////////////

function initControls() {
	controls = new function () {
			this.sphereRadius = 10;
  };

  var gui = new dat.GUI();
  gui.add(controls, 'sphereRadius', 1, 50);
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