import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const result = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const nav = document.querySelector("nav a span, nav a");
  const styles = getComputedStyle(document.documentElement);
  return {
    h1Font: h1 ? getComputedStyle(h1).fontFamily : null,
    bodyFont: getComputedStyle(document.body).fontFamily,
    navFont: nav ? getComputedStyle(nav).fontFamily : null,
    varBebas: getComputedStyle(document.body).getPropertyValue("--font-bebas"),
    varDisplay: styles.getPropertyValue("--font-display"),
    loadedFonts: [...document.fonts].map((f) => `${f.family} ${f.status}`),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
