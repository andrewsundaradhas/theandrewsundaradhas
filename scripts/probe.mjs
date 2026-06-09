import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 320, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => new Promise((r) => setTimeout(r, 600)));

const res = await page.evaluate(() => {
  const base = document.documentElement.scrollWidth;
  const vw = window.innerWidth;
  const culprits = [];
  const all = Array.from(document.querySelectorAll("body *"));
  for (const el of all) {
    const prev = el.style.display;
    el.style.display = "none";
    const now = document.documentElement.scrollWidth;
    el.style.display = prev;
    if (now <= vw && base > vw) {
      culprits.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || "").toString().slice(0, 90),
        pos: getComputedStyle(el).position,
        text: (el.textContent || "").trim().slice(0, 24),
      });
    }
  }
  return { base, vw, culprits: culprits.slice(0, 20) };
});

console.log("base scrollWidth=", res.base, "vw=", res.vw);
console.log("Elements whose removal eliminates the overflow:");
res.culprits.forEach((c) => console.log(`  <${c.tag}> pos=${c.pos} "${c.text}" | ${c.cls}`));
await browser.close();
