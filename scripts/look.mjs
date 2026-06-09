import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });
const width = Number(process.argv[2] || 1280);
const ids = process.argv.slice(3);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
// Force every scroll-reveal element to its resting (visible) state for static QA
await page.addStyleTag({ content: "*{opacity:1 !important; transform:none !important; animation:none !important;}" });
await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));

for (const id of ids) {
  const el = await page.$(`#${id}`);
  if (!el) { console.log("missing #" + id); continue; }
  await el.screenshot({ path: `${OUT}/look-${width}-${id}.png` });
  console.log("shot look-" + width + "-" + id);
}
await browser.close();
