import { chromium } from "playwright";

const OUT = process.argv[2] ?? ".";
const browser = await chromium.launch();
const page = await browser.newPage({ viewportSize: { width: 1440, height: 900 } });
await page.goto(process.env.BASE ?? "http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/01-hero.png` });

const targets = ["#origin", "#music", "#sea", "#vlogs", "#ventures", "#contact"];
for (const sel of targets) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, sel);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${OUT}/${sel.replace("#", "02-")}.png` });
}

// mid-way through the pinned horizontal Sea section
await page.evaluate(() => {
  const el = document.querySelector("#sea");
  if (el) window.scrollTo(0, el.offsetTop + window.innerHeight * 1.5);
});
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/03-sea-mid.png` });

// mobile check
await page.setViewportSize({ width: 375, height: 812 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/04-mobile-hero.png` });

await browser.close();
console.log("done");
