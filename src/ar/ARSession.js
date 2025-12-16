
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { MeasurementManager } from '../measurement/MeasurementManager.js';
import { RoomDetector } from './RoomDetector.js';

export class ARSession {
  async start() {
    this.session = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test', 'local-floor']
    });

    this.renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    this.renderer.xr.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();

    this.measurements = new MeasurementManager(this.scene);
    this.roomDetector = new RoomDetector(this.measurements);

    this.refSpace = await this.session.requestReferenceSpace('local-floor');
    this.viewerSpace = await this.session.requestReferenceSpace('viewer');
    this.hitTestSource = await this.session.requestHitTestSource({ space:this.viewerSpace });

    this.renderer.setAnimationLoop(this.onFrame.bind(this));
    await this.renderer.xr.setSession(this.session);
  }

  onFrame(time, frame) {
    const hits = frame.getHitTestResults(this.hitTestSource);
    if (hits.length) {
      const pose = hits[0].getPose(this.refSpace);
      this.measurements.updateHit(pose.transform.position);
      this.roomDetector.evaluate();
    }
    this.renderer.render(this.scene, this.camera);
  }
}
