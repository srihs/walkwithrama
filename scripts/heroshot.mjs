import { chromium } from "playwright";

const OUT = process.argv[2] ?? ".";
const browser = await chromium.launch();
const page = await browser.newPage({ viewportSize: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/hero-fixed.png` });
const font = await page.evaluate(
  () => getComputedStyle(document.querySelector("h1")).fontFamily
);
console.log("h1 font:", font);
await page.setViewportSize({ width: 375, height: 812 });
await page.waitForTimeout(1000);
await page.screenshot({ path: `${OUT}/hero-fixed-mobile.png` });
await browser.close();
console.log("done");
