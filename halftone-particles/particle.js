function Particle(scene, location, bounds) {

	this.velocity = new THREE.Vector3(0, 0, 0);
	this.acceleraton = new THREE.Vector3(0, 0, 0);
	this.maxVelocity = 1;
	this.maxAcceleration = 0.05;
	this.brakingDist = 1;
	this.bounds = bounds;

	var material = new THREE.SpriteMaterial();
	this.instance = new THREE.Sprite(material);
	this.instance.position.set(location.x, location.y, location.z);
	scene.add(this.instance);
}

Particle.prototype = {

	constructor: Particle,

	moveTo: function (coord) {
		var direction = coord.sub(this.instance.position);
		direction.normalize();
		this.acceleraton = direction.multiply(new THREE.Vector3(this.maxAcceleration, this.maxAcceleration, 0));
	},

	setRandomVelocity: function () {
		this.velocity.add(new THREE.Vector3(randomCoord(2), randomCoord(2), 0));
	},

	checkEdges: function () {
		if (this.instance.position.x > this.bounds.width/2 || this.instance.position.x < -this.bounds.width/2) {
			this.velocity.multiply(new THREE.Vector3(-1, 1, 1));
		}
		if (this.instance.position.y > this.bounds.height/2 || this.instance.position.y < -this.bounds.height/2) {
			this.velocity.multiply(new THREE.Vector3(1, -1, 1));
		}
	},

	reverseVelocity: function () {
		var reverseVector = this.velocity.negate();
		this.velocity.set(reverseVector.x, reverseVector.y, reverseVector.z);
	},

	update: function() {
		// this.velocity.add(this.acceleraton);
		// this.velocity.clamp(
		// 	new THREE.Vector3(-this.maxVelocity, -this.maxVelocity, 0),
		// 	new THREE.Vector3(this.maxVelocity, this.maxVelocity, 0)
		// );
		this.checkEdges();
		this.instance.position.add(this.velocity);
	},

	destroy: function (scene) {
		scene.remove(this.instance);
	}

}