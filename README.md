Playwright 自动化测试工具

#### Playwright Test是专门为满足端到端测试的需求而创建的。Playwright支持所有现代渲染引擎，包括Chromium、WebKit和Firefox。在Windows、Linux和macOS上测试，本地或CI上测试，无头或使用Android和mobile Safari的Google Chrome原生移动模拟进行测试。

1. 安装

   ```
   npm init playwright@latest
   ```

   为了方便使用推荐使用vscode插件 

具体详细安装步骤参考官网https://playwright.dev/docs/getting-started-vscode

2.运行

```bash

运行所有测试
 npx playwright test
 运行单个测试文件
 npx playwright test landing-page.spec.ts
 运行一组测试文件
 npx playwright test tests/todo-page/ tests/landing-page/
 运行具有文件名或文件名中的文件landinglogin
 npx playwright test landing login
 使用标题运行测试
 npx playwright test -g "add a todo item"
 在定向模式下运行测试
 npx playwright test landing-page.spec.ts --headed
 在特定浏览器上运行测试
 npx playwright test landing-page.ts --project=chromium
 测试报告
 npx playwright show-report
```

3. 使用 Codegen 自动生成测试

```
使用该命令运行测试生成器，后跟要为其生成测试的网站的 URL。URL 是可选的 --viewport-size 设置浏览器窗口大小
npx playwright codegen http://116.196.120.217:7902/platform/login --viewport-size=1920,1080
执行 codegen 并运行浏览器。 Playwright CLI 将记录用户交互动作并生成JavaScript代码     
```

