
export class RoomDetector {
  constructor(measurements) {
    this.m = measurements;
  }

  evaluate() {
    if (this.m.points.length < 4) return;
    const first = this.m.points[0];
    const last = this.m.points[this.m.points.length-1];
    const dist = first.distanceTo(last);
    if (dist < 0.25) {
      console.log("Room closed. Points:", this.m.points.length);
    }
  }
}
