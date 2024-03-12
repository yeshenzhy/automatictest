import { test, expect,chromium } from '@playwright/test';
/**测试账号 */
const config = {
  url: "http://192.168.0.105:3654/#/pages/account/login",
  account: [
    {
      name: "91210244089087324F",
      pwd: "SMyx@1010."
    }
  ]
}

test.use({
  actionTimeout: 5 * 60 * 1000,
  viewport: {
    height: 1080,
    width: 1920
  }
});
test('结算', async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  /**批量验证登录 */
  for(let i= 0;i< config.account.length;i++) {
    const page = await context.newPage()
    await page.goto(config.url);
    await page.locator('uni-input').filter({ hasText: '请输入用户名/手机号' }).getByRole('textbox').fill(config.account[i].name);
    await page.locator('input[type="password"]').fill(config.account[i].pwd);
    await page.locator('uni-label uni-view').first().click();
    await page.locator('uni-form uni-view').filter({ hasText: '请输入用户名/手机号请输入密码记住密码 登录' }).locator('uni-button').click();
    await page.locator('uni-view').filter({ hasText: /^cancel$/ }).click();
    // await page.getByText('合同中心').nth(1).click();
    await page.getByText('合同中心').click();
    await page.frameLocator('iframe').getByText('买家').click();

    await page.waitForTimeout(100000)
  }
  // await browser.close()
});


