import * as THREE from "three";

export default class PlanetWithLighting {
  constructor(radius, distance, texturePath) {
    this.radius = radius; 
    this.distance = distance; 
    this.texturePath = texturePath;
    const geometry = new THREE.SphereGeometry(this.radius);
    const texture = new THREE.TextureLoader().load(this.texturePath);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 5,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = this.distance;
  }

  getMesh() {
    return this.mesh; // Return existing mesh directly
  }
}