
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export class MeasurementManager {
  constructor(scene) {
    this.scene = scene;
    this.points = [];
    this.material = new THREE.MeshBasicMaterial({ color:0x00ff00 });
    window.addEventListener('click', ()=>this.addPoint());
  }

  updateHit(pos) {
    this.lastHit = pos;
  }

  addPoint() {
    if (!this.lastHit) return;
    const geom = new THREE.SphereGeometry(0.03);
    const mesh = new THREE.Mesh(geom, this.material);
    mesh.position.set(this.lastHit.x, this.lastHit.y, this.lastHit.z);
    this.scene.add(mesh);
    this.points.push(mesh.position.clone());
  }
}
