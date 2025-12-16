
import { ARSession } from './ar/ARSession.js';
import { DeviceCheck } from './utils/DeviceCheck.js';

if (await DeviceCheck.isSupported()) {
  const ar = new ARSession();
  ar.start();
} else {
  document.body.innerHTML = "<h3>AR not supported</h3>";
}
