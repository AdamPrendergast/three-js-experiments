function Particle(xPos, yPos, scene) {

	var material = new THREE.SpriteMaterial();
	this.instance = new THREE.Sprite(material);
	this.instance.position.set(xPos, yPos, 0);
	scene.add(this.instance);

	this.velocity = new THREE.Vector3(0, -Math.random(), 0);
}

Particle.prototype = {

	contructor: Particle,

	destroy: function(scene) {
		scene.remove(this.instance);
	},

	moveDown: function () {
		this.instance.position.add(this.velocity);
	}

}