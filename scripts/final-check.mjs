import { chromium } from "playwright-core";
import fs from "node:fs";

const executablePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:5173/";
fs.mkdirSync("screenshots", { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });

async function scratch(page) {
  const canvas = page.locator("canvas.scratch-card__canvas");
  await canvas.waitFor({ state: "visible", timeout: 5000 });
  const box = await canvas.boundingBox();
  const x0 = box.x + box.width * 0.08;
  const x1 = box.x + box.width * 0.92;
  const y0 = box.y + box.height * 0.08;
  const y1 = box.y + box.height * 0.92;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  for (let row = 0; row < 18; row += 1) {
    const y = y0 + ((y1 - y0) * row) / 17;
    if (row % 2 === 0) {
      await page.mouse.move(x0, y, { steps: 12 });
      await page.mouse.move(x1, y, { steps: 24 });
    } else {
      await page.mouse.move(x1, y, { steps: 12 });
      await page.mouse.move(x0, y, { steps: 24 });
    }
    const label = await page.locator(".scratch-meter__label").textContent().catch(() => "");
    if (label?.includes("deblocată")) break;
  }
  await page.mouse.up();
}

async function run(width, height, tag, isMobile) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile,
    hasTouch: isMobile,
  });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await scratch(page);
  await page.waitForTimeout(9600);
  await page.screenshot({ path: `screenshots/final-cake-${tag}.png` });

  await page.getByRole("button", { name: /Suflă/i }).click({ force: true });
  await page.waitForTimeout(15000);
  await page.screenshot({ path: `screenshots/final-galaxy-${tag}.png` });

  const overflow = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
    sh: document.documentElement.scrollHeight,
    ch: document.documentElement.clientHeight,
  }));
  if (overflow.sw > overflow.cw + 1) {
    errors.push(`horizontal overflow ${JSON.stringify(overflow)}`);
  }

  const replay = page.getByRole("button", { name: /Reia/i });
  const replayVisible = await replay.isVisible().catch(() => false);
  if (!replayVisible) errors.push("Replay button not visible after finale");
  else {
    await replay.click({ force: true });
    await page.waitForTimeout(1600);
    const backToEntrance = await page
      .locator("canvas.scratch-card__canvas")
      .isVisible()
      .catch(() => false);
    if (!backToEntrance) errors.push("Replay did not return to the scratch card");
    await page.screenshot({ path: `screenshots/final-replay-${tag}.png` });
  }

  console.log(`${tag}: replay=${replayVisible} errors=`, errors);
  await page.close();
}

await run(1440, 900, "desktop", false);
await run(390, 844, "mobile", true);
await run(740, 360, "landscape", true);
await browser.close();
