function ParticleSystem(scene) {

	this.scene = scene;
	this.particles = []

}

ParticleSystem.prototype = {

	construnctor: ParticleSystem,

	emitParticles: function () {
		for (var i = 0; i < controls.emitRate; i++) {
	    this.particles.push(new Particle(this.scene, randomVector()));
	  }
	},

	cleanupParticle: function (particle) {
		var index = this.particles.indexOf(particle);
	  if (index > -1) {
	    this.particles.splice(index, 1);
	  }
	  particle.destroy(this.scene);
	},

	run: function () {
		for (var i = 0; i < this.particles.length; i++) {
			var particle = this.particles[i];
	    if (particle.isDead()) {
	      this.cleanupParticle(particle);
	    }
	    particle.update(new THREE.Vector3(randomCoord(0.1), randomCoord(0.1), 0));
	  }
	}

}