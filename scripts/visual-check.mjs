import { chromium } from "playwright-core";
import fs from "node:fs";

const executablePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:5173/";
const outDir = "screenshots";
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });

async function scratch(page) {
  const canvas = page.locator("canvas.scratch-card__canvas");
  await canvas.waitFor({ state: "visible", timeout: 5000 });
  const box = await canvas.boundingBox();
  if (!box) throw new Error("Scratch canvas has no bounding box");
  const x0 = box.x + box.width * 0.08;
  const x1 = box.x + box.width * 0.92;
  const y0 = box.y + box.height * 0.08;
  const y1 = box.y + box.height * 0.92;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  const rows = 18;
  for (let row = 0; row < rows; row += 1) {
    const y = y0 + ((y1 - y0) * row) / (rows - 1);
    if (row % 2 === 0) {
      await page.mouse.move(x0, y, { steps: 12 });
      await page.mouse.move(x1, y, { steps: 24 });
    } else {
      await page.mouse.move(x1, y, { steps: 12 });
      await page.mouse.move(x0, y, { steps: 24 });
    }
    const label = await page
      .locator(".scratch-meter__label")
      .textContent()
      .catch(() => "");
    if (label?.includes("deblocată")) break;
  }
  await page.mouse.up();
  await page.waitForTimeout(350);
}

async function runDesktop() {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${outDir}/01-entrance-desktop.png` });

  await scratch(page);
  await page.screenshot({ path: `${outDir}/02-reveal-desktop.png` });

  await page.waitForTimeout(9300);
  await page.screenshot({ path: `${outDir}/03-cake-lit-desktop.png` });

  const blow = page.getByRole("button", { name: /Suflă/i });
  if (await blow.isVisible().catch(() => false)) {
    await blow.click({ force: true });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${outDir}/04-cake-blown-desktop.png` });
  } else {
    errors.push("Blow button did not become visible");
  }

  await page.waitForTimeout(3800);
  await page.screenshot({ path: `${outDir}/05-galaxy-early-desktop.png` });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: `${outDir}/06-galaxy-final-desktop.png` });

  console.log("desktop errors:", errors);
  await page.close();
}

async function runMobile(width, height, tag) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${outDir}/07-entrance-${tag}.png` });

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: document.documentElement.clientHeight,
  }));
  if (overflow.scrollWidth > overflow.clientWidth + 1) {
    errors.push(`horizontal overflow: ${JSON.stringify(overflow)}`);
  }

  await scratch(page);
  await page.waitForTimeout(9300);
  await page.screenshot({ path: `${outDir}/08-cake-${tag}.png` });

  const blow = page.getByRole("button", { name: /Suflă/i });
  if (await blow.isVisible().catch(() => false)) {
    await blow.click({ force: true });
    await page.waitForTimeout(3800);
    await page.waitForTimeout(8000);
    await page.screenshot({ path: `${outDir}/09-galaxy-${tag}.png` });
  } else {
    errors.push("Mobile blow button did not become visible");
  }

  console.log(`${tag} errors:`, errors);
  await page.close();
}

await runDesktop();
await runMobile(390, 844, "390x844");
await runMobile(360, 640, "360x640");
await browser.close();
