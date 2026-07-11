import { chromium } from "playwright";

const OUT = process.argv[2] ?? ".";
const browser = await chromium.launch();
const page = await browser.newPage({ viewportSize: { width: 1440, height: 900 } });
await page.goto("http://localhost:3111", { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.querySelector("#gallery")?.scrollIntoView({ behavior: "instant", block: "start" });
});
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/gallery-top.png` });
await page.evaluate(() => window.scrollBy(0, 700));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/gallery-bottom.png` });
await browser.close();
console.log("done");
