import * as THREE from "three";

export default class PlanetWithLighting {
  constructor(radius, distance, texturePath) {
    const geometry = new THREE.SphereGeometry(radius);
    const texture = new THREE.TextureLoader().load(texturePath);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 5,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = distance;
  }

  getMesh() {
    if (this.mesh === undefined || this.mesh === null) {
      const geometry = new THREE.SphereGeometry(this.radius);
      const texture = new THREE.TextureLoader().load(this.textureFile);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.x += this.positionX;
    }
    return this.mesh;
  }
}
