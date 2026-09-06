import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.TEST_URL || 'http://localhost:4173';
const out = process.env.QA_DIR || 'outputs/qa';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const results = {
  viewports: [],
  interactions: [],
  errors: [],
  a11y: [],
  failures: [],
};
const errors = [];
async function settled(p) {
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() =>
    document
      .querySelector('main')
      ?.classList.contains(
        matchMedia('(max-width: 760px)').matches ? 'reading' : 'presenting',
      ),
  );
  await p.locator('.motion-off').waitFor();
  await p.waitForTimeout(120);
}
async function goto(p, n) {
  await p.evaluate((n) => (location.hash = `slide-${n}`), n);
  await p.waitForFunction(
    (n) =>
      document
        .querySelector('.presenting .slide')
        ?.getAttribute('data-slide') === String(n - 1),
    n,
  );
  await p.waitForTimeout(80);
}
try {
  for (const viewport of process.env.INTERACTIONS_ONLY
    ? []
    : [
        { width: 1440, height: 900 },
        { width: 1920, height: 1080 },
        { width: 1366, height: 768 },
        { width: 768, height: 1024 },
        { width: 390, height: 844 },
        { width: 320, height: 740 },
      ]) {
    const context = await browser.newContext({
      viewport,
      reducedMotion: 'reduce',
    });
    const p = await context.newPage();
    p.on('pageerror', (e) => errors.push(e.message));
    p.on('console', (m) => {
      if (m.type() === 'error') errors.push(m.text());
    });
    await p.goto(base);
    await settled(p);
    const reading = viewport.width <= 760;
    assert.equal((await p.locator('.reading').count()) > 0, reading);
    const record = { ...viewport, slides: [], horizontalOverflow: 0 };
    for (let n = 1; n <= 16; n++) {
      if (reading) await p.locator(`#slide-${n}`).scrollIntoViewIfNeeded();
      else await goto(p, n);
      await p.waitForTimeout(70);
      const bounds = await p.locator(`#slide-${n}`).evaluate((el) => {
        const section = el.getBoundingClientRect();
        return {
          height: section.height,
          overflow: Math.max(
            0,
            document.documentElement.scrollWidth - innerWidth,
          ),
          textClips: [...el.querySelectorAll('h1,h2,h3,p,button')]
            .filter((e) => {
              const r = e.getBoundingClientRect();
              return (
                r.width > 0 &&
                (r.left < section.left - 1 || r.right > section.right + 1)
              );
            })
            .map((e) => e.textContent.slice(0, 80)),
          missingImages: [...el.querySelectorAll('img')]
            .filter((i) => i.complete && i.naturalWidth === 0)
            .map((i) => i.getAttribute('src')),
          hiddenContent: [
            ...el.querySelectorAll(
              'h1,h2,.numbered-list>div,.impact-items>div,.team-portraits>div',
            ),
          ]
            .filter((e) => Number(getComputedStyle(e).opacity) < 0.9)
            .map((e) => e.textContent.trim().slice(0, 80)),
        };
      });
      record.slides.push({ n, ...bounds });
      record.horizontalOverflow = Math.max(
        record.horizontalOverflow,
        bounds.overflow,
      );
      if (
        bounds.overflow ||
        bounds.textClips.length ||
        bounds.missingImages.length ||
        bounds.hiddenContent.length
      )
        results.failures.push({ viewport, n, ...bounds });
      if ([1440, 1366, 390].includes(viewport.width)) {
        if (reading)
          await p
            .locator(`#slide-${n}`)
            .screenshot({ path: `${out}/${viewport.width}-slide-${n}.png` });
        else
          await p.screenshot({
            path: `${out}/${viewport.width}-slide-${n}.png`,
          });
      }
      if (viewport.width === 1440) {
        const axe = await new AxeBuilder({ page: p })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        if (axe.violations.length)
          results.a11y.push({
            slide: n,
            violations: axe.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((e) => e.target),
            })),
          });
      }
    }
    results.viewports.push(record);
    console.log(
      `Viewport ${viewport.width}×${viewport.height}: 16 slides inspected`,
    );
    await context.close();
  }
  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'no-preference',
  });
  const motionPage = await motionContext.newPage();
  motionPage.on('pageerror', (e) => errors.push(e.message));
  await motionPage.goto(base);
  await motionPage.waitForFunction(() =>
    document.querySelector('main')?.classList.contains('presenting'),
  );
  const fishBefore = await motionPage
    .locator('.hero-fish')
    .evaluate((e) => getComputedStyle(e).transform);
  await motionPage.waitForTimeout(700);
  const fishAfter = await motionPage
    .locator('.hero-fish')
    .evaluate((e) => getComputedStyle(e).transform);
  assert.notEqual(fishBefore, fishAfter);
  await goto(motionPage, 7);
  assert.match(
    await motionPage
      .locator('.machine-visual > img')
      .evaluate((e) => getComputedStyle(e).animationName),
    /machine-orbit/,
  );
  await motionPage
    .getByRole('button', { name: 'หยุดภาพเคลื่อนไหว', exact: true })
    .click();
  assert.equal(
    await motionPage
      .locator('.machine-visual > img')
      .evaluate((e) => getComputedStyle(e).animationName),
    'none',
  );
  results.interactions.push(
    'Cinematic motion runs and manual motion control stops it',
  );
  await motionContext.close();
  const interactionContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const p = await interactionContext.newPage();
  p.on('pageerror', (e) => errors.push(e.message));
  await p.goto(base);
  await settled(p);
  await p.getByRole('button', { name: 'สไลด์ถัดไป', exact: true }).click();
  assert.equal(await p.locator('.slide').getAttribute('data-slide'), '1');
  await p.keyboard.press('ArrowLeft');
  assert.equal(await p.locator('.slide').getAttribute('data-slide'), '0');
  await p.keyboard.press('End');
  assert.equal(await p.locator('.slide').getAttribute('data-slide'), '15');
  assert.equal(
    await p.getByRole('button', { name: 'สไลด์ถัดไป', exact: true }).isDisabled(),
    true,
  );
  await p.keyboard.press('Home');
  assert.equal(
    await p
      .getByRole('button', { name: 'สไลด์ก่อนหน้า', exact: true })
      .isDisabled(),
    true,
  );
  results.interactions.push('Keyboard, previous/next, first/last boundaries');
  await p.getByRole('button', { name: 'เปิดสารบัญ', exact: true }).click();
  assert.equal(await p.locator('dialog').evaluate((el) => el.open), true);
  await p.locator('.contents-grid button').nth(7).click();
  assert.equal(await p.locator('.slide').getAttribute('data-slide'), '7');
  assert.equal(await p.locator('dialog').evaluate((el) => el.open), false);
  await p.locator('.hardware-tabs button').nth(1).click();
  assert.equal(await p.locator('.product-label').textContent(), 'ESP32');
  results.interactions.push('Contents navigation and hardware selection');
  await goto(p, 12);
  await p.locator('.journey-tabs button').nth(4).click();
  assert.equal(await p.locator('.journey-detail h3').textContent(), 'ประเมิน');
  results.interactions.push('All workflow steps selectable');
  await goto(p, 5);
  await p.getByRole('button', { name: '32°C', exact: true }).click();
  assert.match(await p.locator('.research-callout').textContent(), /26.6/);
  const ratio = await p.evaluate(() => {
    const a = document.querySelectorAll('.bar-fill');
    return (
      a[0].getBoundingClientRect().height / a[1].getBoundingClientRect().height
    );
  });
  assert.ok(Math.abs(ratio - 43.4 / 26.6) < 0.01);
  results.interactions.push(
    'Research toggle and numerically proportional chart',
  );
  await goto(p, 10);
  await p.getByRole('button', { name: 'ลองคำนวณอัตราฟัก' }).click();
  assert.equal(await p.locator('.calculator output').textContent(), '80.0%');
  await p.getByLabel('จำนวนไข่ตั้งต้น').fill('0');
  assert.equal(
    await p.locator('.calculator output').textContent(),
    'ตรวจสอบจำนวน',
  );
  await p.getByLabel('จำนวนไข่ตั้งต้น').fill('100');
  await p.getByLabel('จำนวนที่ฟัก').fill('101');
  assert.equal(
    await p.locator('.calculator output').textContent(),
    'ตรวจสอบจำนวน',
  );
  await p.getByLabel('จำนวนที่ฟัก').fill('50');
  assert.equal(await p.locator('.calculator output').textContent(), '50.0%');
  await p.getByLabel('จำนวนที่ฟัก').press('ArrowRight');
  assert.equal(await p.locator('.slide').getAttribute('data-slide'), '9');
  results.interactions.push(
    'Calculator correct, zero/out-of-range values rejected, input keys do not navigate',
  );
  await p.locator('.slide-source').click();
  assert.equal(await p.locator('dialog').evaluate((el) => el.open), true);
  await p.getByRole('button', { name: 'หน้า 43', exact: true }).click();
  await p.locator('.source-page-link img').evaluate((img) => img.decode());
  assert.ok(
    (await p.locator('.source-page-link img').getAttribute('src')).includes(
      '43',
    ),
  );
  await p.keyboard.press('Escape');
  assert.equal(await p.locator('dialog').evaluate((el) => el.open), false);
  results.interactions.push('Source pages loaded; Escape closes modal');
  await p.getByRole('button', { name: 'เปิดบันทึกผู้บรรยาย' }).click();
  assert.match(await p.locator('.notes-content').textContent(), /ไม่ได้รันโมเดล/);
  const axe = await new AxeBuilder({ page: p })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  if (axe.violations.length)
    results.a11y.push({
      state: 'notes-dialog',
      violations: axe.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((e) => e.target),
      })),
    });
  await p.getByRole('button', { name: 'ปิดหน้าต่าง' }).click();
  results.interactions.push('Presenter notes, dialog keyboard and focus');
  await p.getByRole('button', { name: 'เปลี่ยนเป็นโหมดอ่าน' }).click();
  assert.equal(await p.locator('.slide').count(), 16);
  await p.getByRole('button', { name: 'เปลี่ยนเป็นโหมดสไลด์' }).click();
  assert.equal(await p.locator('.slide').count(), 1);
  results.interactions.push('Reading/presentation modes');
  await p.getByRole('button', { name: 'เปิดภาพเคลื่อนไหว', exact: true }).click();
  assert.equal(await p.locator('.motion-off').count(), 0);
  await p.keyboard.press('m');
  assert.equal(await p.locator('.motion-off').count(), 1);
  results.interactions.push('Reduced-motion default and manual motion toggle');
  await p.getByRole('button', { name: 'พรีเซนต์', exact: true }).click();
  await p.waitForFunction(() => !!document.fullscreenElement);
  await p.getByRole('button', { name: 'ออกเต็มจอ', exact: true }).click();
  await p.waitForFunction(() => !document.fullscreenElement);
  results.interactions.push('Fullscreen enter and exit');
  await goto(p, 1);
  await p.clock.install();
  await p
    .getByRole('button', { name: 'เล่นอัตโนมัติ ทุก 16 วินาที', exact: true })
    .click();
  await p.clock.fastForward(16050);
  assert.equal(await p.locator('.slide').getAttribute('data-slide'), '1');
  await p.getByRole('button', { name: 'หยุดเล่นอัตโนมัติ', exact: true }).click();
  await p.clock.fastForward(20000);
  assert.equal(await p.locator('.slide').getAttribute('data-slide'), '1');
  results.interactions.push('Autoplay advances at 16 seconds and pauses');
  await p.close();
} catch (e) {
  results.failures.push({ exception: e.stack });
  console.error(e);
} finally {
  results.errors = [...new Set(errors)];
  fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2));
  await browser.close();
}
console.log(
  JSON.stringify(
    {
      viewports: results.viewports.length,
      interactions: results.interactions.length,
      errors: results.errors,
      a11y: results.a11y,
      failures: results.failures,
    },
    null,
    2,
  ),
);
if (results.failures.length || results.errors.length || results.a11y.length)
  process.exitCode = 1;
