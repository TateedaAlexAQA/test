// @ts-check
const { test, expect } = require('@playwright/test');
require('dotenv').config();

test("Login" , async({page}) => {
  // @ts-ignore
  await page.goto(process.env.env);

  // Заполните поле "Username" и "Password"
  // @ts-ignore
  await page.fill('input[name="username"]', process.env.USER);
  // @ts-ignore
  await page.fill('input[name="password"]', process.env.pass);
  await page.waitForTimeout(5000)

  // Нажмите кнопку "Login"
  await page.click('button[type="submit"]');

  try {
    await page.waitForSelector('.flash.success', { timeout: 2000 });
    console.log('Вход выполнен успешно!');
  } catch (error) {
    console.error('Не удалось выполнить вход в течение 2 секунд.');
    throw error
  }
  await page.waitForTimeout(5000)

})


