import { test, expect } from '@playwright/test';

test('navigates across primary sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /モダンなWebサイト/ })).toBeVisible();

  await page.getByRole('link', { name: 'About' }).click();
  await expect(
    page.getByRole('heading', { name: 'このプロジェクトについて' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page.getByRole('heading', { name: 'お問い合わせ' })).toBeVisible();

  await page.getByRole('link', { name: 'Blog' }).click();
  await expect(page.getByRole('heading', { name: 'ブログ' })).toBeVisible();
});
