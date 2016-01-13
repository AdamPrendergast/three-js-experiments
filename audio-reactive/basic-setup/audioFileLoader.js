function AudioFileLoader() {

}

AudioFileLoader.prototype = {

	load: function (audioContext, path, callback) {
		var request = new XMLHttpRequest();
		request.open('GET', path, true);
		request.responseType = 'arraybuffer';
		// Decode asynchronously
	  request.onload = function() {
	    audioContext.decodeAudioData(request.response, function(buffer) {
	      callback(buffer);
	    }, function () {
	    	console.log('Failed to load file.');
	    });
	  }
	  request.send();
	}

}