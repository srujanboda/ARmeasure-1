
export const DeviceCheck = {
  async isSupported() {
    return navigator.xr && await navigator.xr.isSessionSupported('immersive-ar');
  }
};
