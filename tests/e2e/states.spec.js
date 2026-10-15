import { test, expect } from '@playwright/test';

test('cenário sem novidades não fabrica acontecimentos nem cartões', async ({ page }) => {
  await page.goto('/?cenario=sem-novidades');
  await expect(page.locator('.indicator').nth(0).locator('strong')).toHaveText('0');
  await expect(page.locator('.priority-label')).toHaveCount(0);
  await expect(page.locator('#source-overview-list [data-source-target]')).toHaveCount(3);
  await page.locator('#source-overview-list [data-source-target="anvisa"]').click();
  const anvisa = page.locator('#source-detail');
  await expect(anvisa.locator('.source-status--no-updates')).toBeVisible();
  await expect(anvisa.locator('.event-card')).toHaveCount(0);
  await expect(anvisa.locator('.empty-state').first()).toContainText(
    'Nenhum acontecimento recente consta nesta amostra',
  );
});

test('falha parcial preserva resultado demonstrativo e não interrompe as outras fontes', async ({ page }) => {
  await page.goto('/?cenario=anvisa-indisponivel');
  await page.locator('#source-overview-list [data-source-target="anvisa"]').click();
  const anvisa = page.locator('#source-detail');
  await expect(anvisa.locator('.source-status--stale')).toContainText('último resultado válido preservado');
  await expect(anvisa).toContainText('SNCR');
  await expect(anvisa).toContainText('Falha de atualização demonstrativa');
  await page.locator('[data-close-source]').click();
  await page.locator('#source-overview-list [data-source-target="dou"]').click();
  await expect(page.locator('#source-detail .source-status--unverified')).toHaveCount(0);
  await expect(page.locator('#source-detail')).not.toContainText('verificação nesta demonstração');
  await expect(page.locator('#source-detail')).not.toContainText('não executou coleta');
  await expect(page.locator('#source-detail')).toContainText('Resolução CM-CMED');
});

test('fato documentado permanece e hipótese sem evidência é omitida na aba metodológica', async ({
  page,
}) => {
  await page.goto('/?cenario=sem-evidencias');
  await page.locator('#source-overview-list [data-source-target="camara"]').click();
  await page.locator('#source-detail').getByRole('button', { name: 'Ver análise' }).last().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('tabpanel', { name: 'Análise' })).toContainText(
    'O PL 3.307/2025 propõe limitar',
  );
  await dialog.getByRole('tab', { name: 'Evidências e metodologia' }).click();
  const evidence = dialog.getByRole('tabpanel', { name: 'Evidências e metodologia' });
  await expect(evidence).toContainText('Fato documentado');
  await expect(evidence).not.toContainText('Hipótese');
  await expect(dialog.locator('#analysis-panel')).not.toContainText('Possíveis efeitos');
});

test('cards do panorama e painel lateral se adaptam sem overflow em desktop, tablet e mobile', async ({
  page,
}) => {
  await page.goto('/');
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#source-overview-list [data-source-target]')).toHaveCount(3);
    const measurements = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(measurements.content, `overflow at ${width}px`).toBeLessThanOrEqual(measurements.viewport + 1);
    await page.locator('#source-overview-list [data-source-target="anvisa"]').click();
    await page.waitForFunction(() => {
      const bounds = document.querySelector('#source-dialog').getBoundingClientRect();
      return Math.abs(bounds.right - window.innerWidth) < 1;
    });
    const panel = await page.locator('#source-dialog').evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return { x: bounds.x, right: bounds.right, width: bounds.width, viewport: window.innerWidth };
    });
    expect(panel.x).toBeGreaterThanOrEqual(0);
    expect(panel.right).toBeLessThanOrEqual(panel.viewport + 1);
    expect(panel.width).toBeLessThanOrEqual(panel.viewport + 1);
    if (width > 820) expect(panel.x).toBeGreaterThan(width * 0.25);
    await page.locator('[data-close-source]').click();
  }
});

test('cartões móveis alternam fonte e prefers-reduced-motion preserva leitura', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#source-overview-list [data-source-target="camara"]').click();
  await expect(page.locator('#source-dialog')).toBeVisible();
  await expect(page.locator('#source-detail h3')).toHaveText('Câmara dos Deputados');
  await expect(page).not.toHaveURL(/#source-/);
  await expect.poll(() => page.locator('.hero__video').evaluate((video) => video.paused)).toBe(true);
  const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
});

test('abas modais são acessíveis pelo teclado e o foco fica contido no diálogo', async ({ page }) => {
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Ver análise' }).first();
  await opener.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Tab');
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  await dialog.getByRole('tab', { name: 'Análise' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(dialog.getByRole('tab', { name: 'Evidências e metodologia' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.keyboard.press('Escape');
  await expect(opener).toBeFocused();
});
