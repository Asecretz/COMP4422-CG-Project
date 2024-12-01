import * as THREE from "three";

export default class Rotation {
  constructor(planetMesh, showRotation = false) {
    this.planetPositionX = planetMesh.position.x;
    this.showRotation = showRotation;
    this.mesh = null; // Initialize mesh as null
  }

  getMesh() {
    if (!this.mesh) {
      const geometry = new THREE.BoxGeometry(this.planetPositionX, 0.25, 0.25);
      const material = new THREE.MeshNormalMaterial();
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.x = this.planetPositionX / 2;
      this.mesh.visible = this.showRotation;
    }
    return this.mesh;
  }
}