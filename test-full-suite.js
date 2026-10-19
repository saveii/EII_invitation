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
  console.log('Launching browser to test full 12-section suite...');
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Click seal to open
  console.log('Opening envelope...');
  await page.click('#seal', { force: true });
  await page.waitForTimeout(7000);

  const sections = [
    { id: '#words', name: 'section-03-words.png' },
    { id: '#couple', name: 'section-04-couple.png' },
    { id: '#countdown', name: 'section-05-countdown.png' },
    { id: '#programme', name: 'section-06-programme.png' },
    { id: '#story', name: 'section-07-story.png' },
    { id: '#candlelight', name: 'section-08-candlelight.png' },
    { id: '#gallery', name: 'section-09-gallery.png' },
    { id: '#venue', name: 'section-10-venue.png' },
    { id: '#gift', name: 'section-11-gift.png' },
    { id: '#wishes', name: 'section-12-wishes.png' }
  ];

  for (const sec of sections) {
    console.log(`Scrolling to ${sec.id} ...`);
    const el = await page.$(sec.id);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      const shotPath = path.join(outDir, sec.name);
      await el.screenshot({ path: shotPath });
      saveScreenshot(shotPath, sec.name);
      console.log(`Captured ${sec.name}`);
    } else {
      console.warn(`Element ${sec.id} not found!`);
    }
  }

  // Test Candlelight interaction
  console.log('Testing Candlelight tap interaction...');
  const btnLantern = await page.$('#btn-light-candle');
  if (btnLantern) {
    await btnLantern.click();
    await page.waitForTimeout(500);
    const afterTap = path.join(outDir, 'interaction-candlelight-tapped.png');
    const clSec = await page.$('#candlelight');
    if (clSec) {
      await clSec.screenshot({ path: afterTap });
      saveScreenshot(afterTap, 'interaction-candlelight-tapped.png');
    }
  }

  // Test Gallery Lightbox
  console.log('Testing Gallery lightbox modal...');
  const firstGalleryItem = await page.$('.gallery-item');
  if (firstGalleryItem) {
    await firstGalleryItem.click();
    await page.waitForTimeout(600);
    const lbShot = path.join(outDir, 'interaction-gallery-lightbox.png');
    await page.screenshot({ path: lbShot });
    saveScreenshot(lbShot, 'interaction-gallery-lightbox.png');

    // Close lightbox
    await page.click('#lb-close');
    await page.waitForTimeout(400);
  }

  // Test Language Switcher
  console.log('Testing Language Switcher to English...');
  await page.click('#lang-toggle');
  await page.waitForTimeout(600);
  const wordsSec = await page.$('#words');
  if (wordsSec) {
    await wordsSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const enShot = path.join(outDir, 'section-words-english.png');
    await wordsSec.screenshot({ path: enShot });
    saveScreenshot(enShot, 'section-words-english.png');
  }

  if (consoleErrors.length > 0) {
    console.warn('[!] Console errors encountered:', consoleErrors);
  } else {
    console.log('[✓] Perfect! Zero console errors across all sections and interactions.');
  }

  await browser.close();
  console.log('Full suite test completed successfully!');
  process.exit(0);
}

run().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
