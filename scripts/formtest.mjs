import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1100, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0", timeout: 60000 });

// reveal everything + jump to the form
await page.addStyleTag({ content: "*{opacity:1!important;transform:none!important;animation:none!important;}" });
await page.evaluate(() => document.getElementById("contact")?.scrollIntoView());
await page.evaluate(() => new Promise((r) => setTimeout(r, 400)));

const hasForm = await page.$("#name");
console.log("form rendered:", Boolean(hasForm));

// 1) Empty submit -> client required attribute blocks, so test server validation
//    by filling name+email but using JS to bypass required on message is overkill.
//    Instead fill valid fields and submit; with no API key we expect a friendly error.
await page.type("#name", "Test Visitor");
await page.type("#email", "delivered@resend.dev");
await page.type("#message", "Hello Andrew — this is an automated pipeline test.");
await page.click('button[type="submit"]');

// wait for the status message to appear
await page.waitForSelector('[role="status"]', { timeout: 20000 });
await page.evaluate(() => new Promise((r) => setTimeout(r, 300)));
const status = await page.$eval('[role="status"]', (el) => el.textContent?.trim());
console.log("status message:", JSON.stringify(status));

await browser.close();
