const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const http = require('http-server');

let server;
let browser;
let page;

beforeAll(async () => {
  // Start a static server to serve index.html
  server = http.createServer({ root: '.' });
  server.listen(8080);

  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:8080/index.html');
});

afterAll(async () => {
  await browser.close();
  server.close();
});

test('Page contains an h1 with correct text', async () => {
  const text = await page.$eval('h1', el => el.textContent);
  expect(text).toBe('Hello, GitHub Classroom!');
});
