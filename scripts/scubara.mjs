import { chromium } from "playwright";

const OUT = process.argv[2] ?? ".";
const browser = await chromium.launch();
const page = await browser.newPage({ viewportSize: { width: 1440, height: 900 } });
await page.goto(
  "https://preview.themeforest.net/item/scubara-dive-ocean-explorations-elementor-template-kit/full_screen_preview/57119703",
  { waitUntil: "domcontentloaded", timeout: 60000 }
);
await page.waitForTimeout(4000);
const iframeSrc = await page.evaluate(
  () => document.querySelector("iframe")?.src ?? null
);
console.log("iframe:", iframeSrc);

if (iframeSrc) {
  await page.goto(iframeSrc, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: `${OUT}/sc-1-hero.png` });
  for (let i = 2; i <= 6; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.4));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${OUT}/sc-${i}.png` });
  }
  const colors = await page.evaluate(() => {
    const counts = {};
    for (const el of document.querySelectorAll("*")) {
      const s = getComputedStyle(el);
      for (const c of [s.backgroundColor, s.color]) {
        if (c && c !== "rgba(0, 0, 0, 0)") counts[c] = (counts[c] || 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);
  });
  console.log(JSON.stringify(colors, null, 1));
  const fonts = await page.evaluate(() => {
    const set = new Set();
    for (const el of document.querySelectorAll("h1,h2,h3,p,a,span"))
      set.add(getComputedStyle(el).fontFamily);
    return [...set].slice(0, 8);
  });
  console.log(JSON.stringify(fonts, null, 1));
}
await browser.close();
