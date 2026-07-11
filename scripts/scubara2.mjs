import { chromium } from "playwright";

const OUT = process.argv[2] ?? ".";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewportSize: { width: 1440, height: 900 },
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
});
await page.goto(
  "https://preview.themeforest.net/item/scubara-dive-ocean-explorations-elementor-template-kit/full_screen_preview/57119703",
  { waitUntil: "domcontentloaded", timeout: 60000 }
);
await page.waitForTimeout(6000);
await page.screenshot({ path: `${OUT}/tf-preview.png` });
const info = await page.evaluate(() => ({
  title: document.title,
  iframes: [...document.querySelectorAll("iframe")].map((f) => f.src),
  links: [...document.querySelectorAll("a")]
    .map((a) => a.href)
    .filter((h) => h && !h.includes("envato") && !h.includes("themeforest"))
    .slice(0, 10),
  bodySnippet: document.body.innerText.slice(0, 400),
}));
console.log(JSON.stringify(info, null, 1));
await browser.close();
