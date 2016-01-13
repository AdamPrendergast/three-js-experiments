function AudioManager() {

	try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

  this.fileLoader = new AudioFileLoader();

}

AudioManager.prototype = {

	constructor: AudioManager,

	soundBuffer: null,

	fileLoaded: function () {
		return AudioManager.prototype.soundBuffer ? true : false;
	},

	loadFile: function (path) {
		this.fileLoader.load(this.audioContext, path, this.setBuffer);		
	},

	setBuffer: function (buffer) {
		AudioManager.prototype.soundBuffer = buffer;
	},

	play: function () {
		if (!this.soundBuffer) {
			console.log('No sound file loaded');
			return;
		}
		var source = this.audioContext.createBufferSource();
		source.buffer = this.soundBuffer;
		source.connect(this.audioContext.destination);
		source.start(0);
	}

}