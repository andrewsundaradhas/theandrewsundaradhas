import puppeteer from "puppeteer-core";
import { readFileSync } from "node:fs";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const out = "public/Andrew-Sundaradhas-Resume.pdf";

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setContent(readFileSync("scripts/resume.html", "utf8"), { waitUntil: "networkidle0" });
await page.pdf({
  path: out,
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "14mm", left: "16mm", right: "16mm" },
});
await browser.close();
console.log("wrote", out);
