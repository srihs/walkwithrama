import { chromium } from "playwright";

const OUT = process.argv[2] ?? ".";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewportSize: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
});
await page.goto("https://kitpro.site/scubara/", {
  waitUntil: "load",
  timeout: 90000,
});
await page.waitForTimeout(5000);
await page.screenshot({ path: `${OUT}/sc-1-hero.png` });
for (let i = 2; i <= 7; i++) {
  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.3));
  await page.waitForTimeout(1800);
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
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 14);
});
console.log("COLORS:", JSON.stringify(colors));
const fonts = await page.evaluate(() => {
  const set = new Set();
  for (const el of document.querySelectorAll("h1,h2,h3,h4,p,a,button"))
    set.add(getComputedStyle(el).fontFamily.split(",")[0]);
  return [...set];
});
console.log("FONTS:", JSON.stringify(fonts));
await browser.close();
