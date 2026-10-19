import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('screenshots');
const artifactDir = path.resolve('C:/Users/ASUS/.gemini/antigravity-ide/brain/8652a208-2b4f-4f06-b532-7bcf248f0811');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function saveScreenshot(sourcePath, filename) {
  const dest = path.join(artifactDir, filename);
  fs.copyFileSync(sourcePath, dest);
}

async function run() {
  console.log('Connecting to Vite at http://localhost:5173 ...');
  const browser = await chromium.launch();

  const viewports = [
    { name: 'phone-390x844', width: 390, height: 844 },
    { name: 'phone-small-320x568', width: 320, height: 568 },
    { name: 'phone-landscape-740x360', width: 740, height: 360 },
    { name: 'desktop-1280x800', width: 1280, height: 800 }
  ];

  for (const vp of viewports) {
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 1. Capture Envelope Closed
    const envShot = path.join(outDir, `envelope-${vp.name}.png`);
    await page.screenshot({ path: envShot });
    saveScreenshot(envShot, `envelope-${vp.name}.png`);

    if (vp.name === 'phone-390x844') {
      console.log('Capturing envelope opening sequence...');
      // Click wax seal with force: true
      await page.click('#seal', { force: true });

      // Frame 1: seal lift
      await page.waitForTimeout(450);
      const f1 = path.join(outDir, 'opening-frame-1-seal-lift.png');
      await page.screenshot({ path: f1 });
      saveScreenshot(f1, 'opening-frame-1-seal-lift.png');

      // Frame 2: flap folds 180° in 3D
      await page.waitForTimeout(1000);
      const f2 = path.join(outDir, 'opening-frame-2-flap-unfold.png');
      await page.screenshot({ path: f2 });
      saveScreenshot(f2, 'opening-frame-2-flap-unfold.png');

      // Frame 3: card drawn out
      await page.waitForTimeout(1400);
      const f3 = path.join(outDir, 'opening-frame-3-card-draw.png');
      await page.screenshot({ path: f3 });
      saveScreenshot(f3, 'opening-frame-3-card-draw.png');

      // Frame 4: card comes to camera
      await page.waitForTimeout(1200);
      const f4 = path.join(outDir, 'opening-frame-4-card-camera.png');
      await page.screenshot({ path: f4 });
      saveScreenshot(f4, 'opening-frame-4-card-camera.png');

      // Frame 5: Cover / Hero screen fully revealed
      await page.waitForTimeout(3800);
      const cov = path.join(outDir, `cover-${vp.name}.png`);
      await page.screenshot({ path: cov });
      saveScreenshot(cov, `cover-${vp.name}.png`);
    } else {
      await page.click('#seal', { force: true });
      await page.waitForTimeout(9500);
      const cov = path.join(outDir, `cover-${vp.name}.png`);
      await page.screenshot({ path: cov });
      saveScreenshot(cov, `cover-${vp.name}.png`);
    }

    if (consoleErrors.length > 0) {
      console.warn(`[!] Console errors on ${vp.name}:`, consoleErrors);
    } else {
      console.log(`[✓] No console errors on ${vp.name}`);
    }

    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured and copied successfully!');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
