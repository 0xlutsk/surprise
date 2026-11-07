import { chromium } from "playwright-core";

const executablePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const previewUrl =
  process.env.PREVIEW_URL || "http://localhost:4173/happybirthday/";
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
const failed = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
});
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
page.on("requestfailed", (req) => failed.push(`${req.url()} :: ${req.failure()?.errorText}`));

const response = await page.goto(previewUrl, {
  waitUntil: "networkidle",
});
await page.waitForTimeout(1500);

const state = await page.evaluate(() => ({
  title: document.title,
  canvas: Boolean(document.querySelector("canvas.scratch-card__canvas")),
  favicon: document.querySelector('link[rel="icon"]')?.getAttribute("href"),
  scripts: [...document.querySelectorAll("script[src]")].map((s) => s.getAttribute("src")),
  styles: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.getAttribute("href")),
}));

console.log("status:", response?.status());
console.log("state:", JSON.stringify(state, null, 2));
console.log("errors:", errors);
console.log("failed requests:", failed);

await page.screenshot({ path: "screenshots/10-production-preview.png" });
await browser.close();
