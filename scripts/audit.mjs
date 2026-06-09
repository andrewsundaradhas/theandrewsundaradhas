import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:3000/";
const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });

const WIDTHS = [320, 360, 375, 414, 768, 1024, 1280, 1440];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars=false"],
});

let totalIssues = 0;

for (const width of WIDTHS) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push("PAGEERROR: " + err.message));

  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
  // let scroll-reveal / fonts settle and scroll through to trigger inview anims
  await page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 400));
    for (let y = 0; y <= document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  // Detect any element whose box extends past the viewport (horizontal overflow)
  const overflow = await page.evaluate((vw) => {
    const offenders = [];
    const docW = document.documentElement.scrollWidth;
    document.querySelectorAll("*").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      // element pokes past the right edge by more than 1px
      if (r.right > vw + 1) {
        const tag = el.tagName.toLowerCase();
        const cls = (el.className && el.className.toString().slice(0, 60)) || "";
        offenders.push(`${tag}.${cls} right=${Math.round(r.right)} (vw=${vw})`);
      }
    });
    return {
      docScrollW: docW,
      innerW: window.innerWidth,
      horizontalScroll: docW > window.innerWidth + 1,
      offenders: offenders.slice(0, 12),
    };
  }, width);

  await page.screenshot({ path: `${OUT}/w${width}.png`, fullPage: true });

  const probScroll = overflow.horizontalScroll;
  const probOffenders = overflow.offenders.length > 0;
  const probErrors = consoleErrors.length > 0;
  if (probScroll || probErrors) totalIssues++;

  console.log(`\n=== ${width}px ===`);
  console.log(`  doc.scrollWidth=${overflow.docScrollW} innerWidth=${overflow.innerW} -> hScroll=${probScroll}`);
  if (probOffenders) {
    console.log(`  overflow offenders (${overflow.offenders.length}):`);
    overflow.offenders.forEach((o) => console.log("    - " + o));
  }
  if (probErrors) {
    console.log(`  console errors (${consoleErrors.length}):`);
    consoleErrors.forEach((e) => console.log("    ! " + e));
  }
  if (!probScroll && !probOffenders && !probErrors) console.log("  OK — no overflow, no errors");

  await page.close();
}

await browser.close();
console.log(`\n==== DONE. widths with hScroll/errors: ${totalIssues} ====`);
