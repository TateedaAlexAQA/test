// @ts-check
const { test, expect } = require('@playwright/test');
require('dotenv').config();


test("Login" , async({page}) => {
console.log('ENV:', process.env.ENV);
console.log('USER:', process.env.USER);
console.log('PASS:', process.env.PASS);

  // @ts-ignore
  await page.goto(process.env.ENV);
  // @ts-ignore
  await page.fill('input[name="username"]', process.env.USER);
  // @ts-ignore
  await page.fill('input[name="password"]', process.env.PASS);
  await page.waitForTimeout(5000)

  // Click on "Login"
  await page.click('button[type="submit"]');

  try {
    await page.waitForSelector('.flash.success', { timeout: 2000 });
    console.log('Login successful!');
  } catch (error) {
    console.error('Login failed within 2 seconds.');
    throw error
  }
  // @ts-ignore
  await page.context().storageState({path:"./aut.json"});
  await page.waitForTimeout(10000)

})

test("reOpen" , async({browser}) => {
  
  const context = await browser.newContext({storageState: "./aut.json"});
  const page = await context.newPage();
    // @ts-ignore
    await page.goto("http://the-internet.herokuapp.com/secure");  
    try {
      await expect(page).toHaveScreenshot("secure.png")
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed within 2 seconds.');
      throw error
    }
  })