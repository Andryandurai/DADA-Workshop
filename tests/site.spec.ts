import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { deliverEnquiry } from '../src/enquiry';

test('catalogue searches descriptions and categories and combines all filters', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.workshop-card')).toHaveCount(10);
  await expect(page.locator('.activity-card')).toHaveCount(10);
  await page.getByRole('searchbox', { name: 'Search workshops' }).fill('privacy');
  await expect(page.locator('.workshop-card')).toHaveCount(1);
  await expect(page.locator('.workshop-card')).toContainText('AI for Students');
  await page.getByRole('searchbox').fill('internet technology');
  await expect(page.locator('.workshop-card')).toHaveCount(2);
  await page.getByRole('searchbox').fill('');
  await page.getByRole('group', { name: 'Workshop categories' }).getByRole('button', { name: 'Coding & Games' }).click();
  await page.getByLabel('Recommended pathway').selectOption('school');
  await expect(page.locator('.workshop-card')).toHaveCount(1);
  await expect(page.locator('.workshop-card')).toContainText('Your First Step into Coding');
  await page.getByRole('searchbox').fill('no-such-topic');
  await expect(page.getByText('No sparks here. Yet.')).toBeVisible();
  await page.getByRole('button', { name: 'Show all workshops' }).click();
  await expect(page.locator('.workshop-card')).toHaveCount(10);
  await expect(page.getByLabel('Recommended pathway')).toHaveValue('all');
});

test('pathways filter the catalogue and native dialog supports Escape and focus restoration', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Explore college workshops' }).click();
  await expect(page.getByLabel('Recommended pathway')).toHaveValue('college');
  await expect(page.locator('.workshop-card')).toHaveCount(8);
  const trigger = page.getByRole('button', { name: 'Explore workshop: Prompt Engineering & AI Mechanics', exact: true });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close details' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Add to my enquiry' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole('button', { name: 'Add to my enquiry' }).click();
  await expect(page.locator('#contact')).toBeFocused();
  await expect(page.getByText('1 topic selected')).toBeVisible();
});

test('activity filters, details, and optional enquiry selections work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('group', { name: 'Activity categories' }).getByRole('button', { name: 'Coding & Games' }).click();
  await expect(page.locator('.activity-card')).toHaveCount(3);
  await page.getByRole('button', { name: 'Explore activity: Bug Bounty — Fix the Broken Code', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('intentional mistakes');
  await expect(page.getByRole('dialog')).toContainText('Debugging');
  await page.getByRole('button', { name: 'Add to my enquiry' }).click();
  await expect(page.getByText('1 activity selected')).toBeVisible();
});

test('enquiry validates then prepares a real mailto draft without a network submission', async ({ page }) => {
  const posts: string[] = [];
  page.on('request', request => { if (request.method() === 'POST') posts.push(request.url()); });
  await page.goto('/');
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(page.getByLabel('Your name *')).toBeFocused();
  await expect(page.getByText('Select at least one workshop topic.')).toBeVisible();
  await page.getByLabel('Your name *').fill('Workshop Coordinator');
  await page.getByLabel('Email address *').fill('coordinator@example.org');
  await page.getByLabel('School or college name *').fill('Test Institution');
  await page.getByLabel('Institution type *', { exact: true }).selectOption('School');
  await page.getByLabel('Student audience *', { exact: true }).selectOption('Classes 8–10');
  await page.getByRole('checkbox', { name: 'From Zero to Website — HTML & CSS', exact: true }).check();
  await page.getByRole('checkbox', { name: 'AI for Students — Beyond ChatGPT', exact: true }).check();
  await page.getByLabel('Participants Optional').fill('0');
  await page.getByLabel('Preferred date Optional').fill('2020-01-01');
  await page.getByRole('checkbox', { name: /I agree to be contacted/ }).check();
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  await expect(page.getByText('Choose today or a future date.')).toBeVisible();
  await expect(page.getByText('Enter a whole number between 1 and 100,000.')).toBeVisible();
  await page.getByLabel('Participants Optional').fill('60');
  await page.getByLabel('Preferred date Optional').fill('');
  await page.getByLabel('Anything else? Optional').fill('Please discuss accessible activities.');
  await page.getByRole('button', { name: 'Prepare email enquiry' }).click();
  const draft = page.getByRole('link', { name: 'Open in email app' });
  await expect(draft).toBeVisible();
  const link = decodeURIComponent((await draft.getAttribute('href'))!);
  expect(link).toContain('mailto:teamdadaoffl@gmail.com');
  expect(link).toContain('From Zero to Website — HTML & CSS');
  expect(link).toContain('AI for Students — Beyond ChatGPT');
  expect(link).toContain('Test Institution');
  await expect(page.getByText(/No message has been sent yet/)).toBeVisible();
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download', exact: true }).click();
  expect((await downloadEvent).suggestedFilename()).toBe('team-dada-workshop-enquiry.txt');
  expect(posts).toEqual([]);
  await page.getByLabel('Your name *').fill('Updated coordinator');
  await expect(draft).toHaveCount(0);
});

test('mobile navigation is keyboard usable and FAQ expands', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open navigation menu' });
  await menu.click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Activities', exact: true }).click();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#activities')).toBeFocused();
  await page.locator('.faq-list summary').filter({ hasText: 'Are the workshops suitable for beginners?' }).click();
  await expect(page.getByText(/Yes. Introductory topics explain/)).toBeVisible();
});

test('desktop, tablet and narrow mobile have no overflow, broken assets or console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  for (const width of [1440, 1180, 1024, 768, 600, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), { message: `horizontal overflow at ${width}px` }).toBe(false);
  }
  for (const section of ['pathways', 'workshops', 'activities', 'team', 'contact']) await page.locator(`#${section}`).scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('img').evaluateAll(images => (images as HTMLImageElement[]).filter(img => img.loading !== 'lazy' || img.complete).every(img => img.naturalWidth > 0))).toBe(true);
  expect(errors).toEqual([]);
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))));
  expect(brokenAnchors).toEqual([]);
});

for (const theme of ['dark', 'light']) test(`${theme} theme passes automated WCAG AA checks`, async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations).toEqual([]);
  await page.getByRole('button', { name: 'Explore workshop: From Zero to Website — HTML & CSS', exact: true }).click();
  const modalAudit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(modalAudit.violations).toEqual([]);
  await page.keyboard.press('Escape'); await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
});

test('optional endpoint never claims delivery for a rejected, malformed or failed response', async () => {
  const originalFetch = globalThis.fetch;
  try {
    for (const response of [new Response('{"success":false}', { status: 200 }), new Response('{"success":true}', { status: 500 }), new Response('not json', { status: 200 })]) {
      globalThis.fetch = async () => response;
      expect(await deliverEnquiry('https://example.invalid/enquiry', { name: 'Test' }, 'test-key')).toBe(false);
    }
    globalThis.fetch = async () => { throw new Error('offline'); };
    expect(await deliverEnquiry('https://example.invalid/enquiry', {}, 'test-key')).toBe(false);
    globalThis.fetch = async (_url, options) => {
      expect(options?.headers).toMatchObject({ 'Idempotency-Key': 'test-key' });
      return new Response('{"success":true}', { status: 200 });
    };
    expect(await deliverEnquiry('https://example.invalid/enquiry', { name: 'Test' }, 'test-key')).toBe(true);
  } finally { globalThis.fetch = originalFetch; }
});
