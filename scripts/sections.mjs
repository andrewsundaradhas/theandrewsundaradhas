import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });

const width = Number(process.argv[2] || 375);
const ids = ["hero", "about", "experience", "projects", "skills", "stats", "leadership", "contact"];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width, height: 740, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });

// scroll through to trigger every whileInView reveal
await page.evaluate(async () => {
  for (let y = 0; y <= document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  await new Promise((r) => setTimeout(r, 400));
});

for (const id of ids) {
  const el = await page.$(`#${id}`);
  if (!el) { console.log(`missing #${id}`); continue; }
  await el.evaluate((node) => node.scrollIntoView({ block: "center" }));
  await page.evaluate(() => new Promise((r) => setTimeout(r, 1400)));
  await el.screenshot({ path: `${OUT}/${width}-${id}.png` });
  console.log(`shot ${width}-${id}`);
}
await browser.close();
