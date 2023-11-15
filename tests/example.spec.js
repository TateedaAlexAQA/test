// @ts-check
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test("Login", async({page}) => {
  console.log('ENV:', process.env.ENV);
  console.log('USER:', process.env.USER);
  console.log('PASS:', process.env.PASS);

  await page.goto(process.env.ENV);
  await page.fill('input[name="username"]', process.env.USER);
  await page.fill('input[name="password"]', process.env.PASS);
  await page.waitForTimeout(5000);

  // Click on "Login"
  await page.click('button[type="submit"]');

  try {
    await page.waitForSelector('.flash.success', { timeout: 2000 });
    console.log('Login successful!');
  } catch (error) {
    console.error('Login failed within 2 seconds.');
    throw error;
  }

  await page.context().storageState({ path: "./aut.json" });
  await page.waitForTimeout(10000);
});

test("reOpen", async({browser}) => {
  const context = await browser.newContext({ storageState: "./aut.json" });
  const page = await context.newPage();

  await page.goto("http://the-internet.herokuapp.com/secure");

  try {
    await expect(page).toHaveScreenshot("secure.png");

    // Создаем файл time.txt и записываем в него текущее время
    const currentTime = new Date().toLocaleString();
    const filePath = path.join(process.cwd(), 'time.txt');
    fs.writeFileSync(filePath, currentTime);

    console.log('Login successful!');
  } catch (error) {
    console.error('Login failed within 2 seconds.');
    throw error;
  }
});

// Добавляем файлы к Artifacts
test.afterAll(async ({}) => {
  const artifactsPath = path.join(process.cwd(), 'playwright-report');
  const filePath = path.join(process.cwd(), 'time.txt');

  // Перемещаем файл в папку с Artifacts
  fs.renameSync(filePath, path.join(artifactsPath, 'time.txt'));
});
