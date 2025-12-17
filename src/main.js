
import { ARSession } from './ar/ARSession.js';
import { DeviceCheck } from './utils/DeviceCheck.js';

if (await DeviceCheck.isSupported()) {
  const btn = document.getElementById('start-btn');
  btn.addEventListener('click', async () => {
    try {
      btn.style.display = 'none';
      const ar = new ARSession();
      await ar.start();
    } catch (e) {
      console.error(e);
      document.body.innerHTML += `<p style="color:red; background:white; position:fixed; bottom:0; padding:10px;">Error: ${e.message}</p>`;
      btn.style.display = 'block';
    }
  });
} else {
  // If element exists, hide it, otherwise do nothing (or handle error)
  const btn = document.getElementById('start-btn');
  if (btn) btn.style.display = 'none';
  document.body.innerHTML += "<h3>AR not supported</h3>";
}
