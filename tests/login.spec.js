import { test, expect,chromium } from '@playwright/test';
/**测试账号 */
const account = [
  {
    name: "91210244089087324F",
    pwd: "SMyx@1010."
  },
  {
    name: "91330109MA2KFK793K",
    pwd: "SMyx@1010."
  }
]

test.use({
  actionTimeout: 5 * 60 * 1000,
  viewport: {
    height: 1080,
    width: 1920
  }
});




test('登录测试', async ({}) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  /**批量验证登录 */
  for(let i= 0;i< account.length;i++) {
    const page = await context.newPage()
    await page.goto('http://116.196.120.217:7902/platform/login');
    await page.getByPlaceholder('请输入用户名').fill(account[i].name);
    await page.getByPlaceholder('请输入密码').fill(account[i].pwd);
    let code = null;
    await page.route('**/api/v2/login/validateCode', routeHandler);
    await page.locator('img').click();
    await page.unroute('**/api/v2/login/validateCode', routeHandler);
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('请输入验证码').fill(code);
    await page.getByRole('button', { name: '登录' }).click();
    await page.waitForTimeout(1000);
    const currentUrl = await page.url();
    await expect(currentUrl).toContain("/platform/index");
   
    /**接口拦截,获取code码 */
    async function routeHandler (route, request) {
      const res = await request.response();
      code = res.headers().verification;
      route.continue();
    }
  }

  await browser.close()
});

