import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("requestfailed", (r) => errors.push("REQFAIL: " + r.url() + " " + r.failure()?.errorText));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));

const info = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map((l) => l.getAttribute("href"));
  const styleTags = document.querySelectorAll("style").length;
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  const bodyFont = getComputedStyle(document.body).fontFamily;
  return { links, styleTags, bodyBg, bodyFont };
});

console.log("stylesheet links:", info.links);
console.log("inline <style> tags:", info.styleTags);
console.log("body backgroundColor:", info.bodyBg);
console.log("body fontFamily:", info.bodyFont.slice(0, 60));
console.log("console errors:", errors.length);
errors.slice(0, 15).forEach((e) => console.log("  ! " + e));
await browser.close();
