function ParticleSystem(scene) {

	this.scene = scene;
	this.particles = [];
	this.particleCount = 200;
	this.isPulsing = false;

	this.bounds = { width: 400, height: 300 };
}

ParticleSystem.prototype = {

	construnctor: ParticleSystem,

	createParticlesAtSingularity: function () {
		var origin = new THREE.Vector3(0, 0, 0);
		for (var i = 0; i < this.particleCount; i++) {
	    this.particles.push(new Particle(this.scene, origin, this.bounds));
	  }
	},

	pulseOn: function () {
		this.isPulsing = true;
		for (var i = 0; i < this.particles.length; i++) {
			if (i % 2 == 0) {
				continue;
			}
			this.particles[i].moveTo(new THREE.Vector3(10, 10, 0));
		}
	},

	moveTo: function (x, y) {
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].moveTo(new THREE.Vector3(x, y, 0));
		}
	},

	moveRandom: function () {
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].setRandomVelocity();
	  }
	},

	run: function () {
		for (var i = 0; i < this.particles.length; i++) {
			this.particles[i].update();
	  }
	}

}