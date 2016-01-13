function Particle(scene, location) {

	this.velocity = new THREE.Vector3(0, 0, 0);
	this.lifespan = controls.lifeSpan;
	this.lifeLeft = this.lifespan;

	var material = new THREE.SpriteMaterial();
	this.instance = new THREE.Sprite(material);
	this.instance.position.set(location.x, location.y, location.z);
	scene.add(this.instance);
}

Particle.prototype = {

	constructor: Particle,

	update: function(acceleraton) {
		this.velocity.add(acceleraton);
		this.instance.position.add(this.velocity);
		this.lifeLeft -= 1;
		this.instance.material.opacity = this.lifeLeft/this.lifespan;
	},

	destroy: function (scene) {
		scene.remove(this.instance);
	},

	isDead: function() {
		if (this.lifeLeft < 0) {
			return true;
		} else {
			return false;
		}
	}

}