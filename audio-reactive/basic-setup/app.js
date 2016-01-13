var scene, camera, renderer, controls;
var audioManager;
var playing = false;

function init() {

	var stats = initStats();
	initControls();

	audioManager = new AudioManager();
	audioManager.loadFile('culture-uplift.mp3');

	render();
}

function render() {
	if (!playing && audioManager.fileLoaded()) {
		audioManager.play();
		playing = true;
	}
	requestAnimationFrame(render);
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