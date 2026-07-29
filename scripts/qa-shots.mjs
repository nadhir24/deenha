import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const OUT = '/tmp/deenha-qa';
mkdirSync(OUT, { recursive: true });

const routes = [
    ['home', '/'],
    ['shop', '/shop'],
    ['shop-dresses', '/shop?category=Dresses'],
    ['scarves', '/scarves'],
    ['product', '/product/12'],
];

const viewports = [
    ['mobile', { width: 390, height: 844 }],
    ['desktop', { width: 1440, height: 900 }],
];

const browser = await chromium.launch();
const problems = [];

for (const [vpName, viewport] of viewports) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    page.on('console', (m) => {
        if (m.type() === 'error') problems.push(`[${vpName}] console: ${m.text().slice(0, 200)}`);
    });
    page.on('pageerror', (e) => problems.push(`[${vpName}] pageerror: ${e.message.slice(0, 200)}`));
    page.on('response', (r) => {
        if (r.status() >= 400) problems.push(`[${vpName}] HTTP ${r.status()} ${r.url().slice(0, 120)}`);
    });

    for (const [name, path] of routes) {
        await page.goto(`http://localhost:5173${path}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1200);
        const cards = await page.locator('a[href^="/product/"]').count();
        await page.screenshot({ path: `${OUT}/${vpName}-${name}.png`, fullPage: false });
        console.log(`${vpName}/${name}: productLinks=${cards}`);
    }
    await ctx.close();
}

await browser.close();
console.log('--- problems ---');
console.log(problems.length ? [...new Set(problems)].join('\n') : 'none');
