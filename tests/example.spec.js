// @ts-check
const { test, expect } = require('@playwright/test');
const{env, userName, pass,} = require("..//Globalwars").default


test("Login" , async({page}) => {
  await page.goto(env);

  // Заполните поле "Username" и "Password"
  await page.fill('input[name="username"]', userName);
  await page.fill('input[name="password"]', pass);

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


