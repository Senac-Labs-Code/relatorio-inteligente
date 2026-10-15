import { test, expect } from '@playwright/test';

test('carrega os módulos e dados locais sem falhas de console', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Panorama regulatório/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'O que merece atenção' })).toBeVisible();
  await expect(page.getByText('Demonstração com dados de referência')).toBeVisible();
  expect(errors).toEqual([]);
});

test('cards abrem painel lateral de fonte, que pode ser fechado para voltar ao panorama', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const sourceCards = page.locator('#source-overview-list [data-source-target]');
  const sourceDialog = page.locator('#source-dialog');
  await expect(sourceCards).toHaveCount(3);
  await expect(sourceDialog).not.toBeVisible();
  await sourceCards.nth(0).focus();
  await page.keyboard.press('Enter');
  await expect(sourceDialog).toBeVisible();
  await expect(page.locator('#source-detail h3')).toHaveText('ANVISA');
  await expect(sourceCards.nth(0)).toHaveAttribute('aria-pressed', 'true');
  const panelBounds = await sourceDialog.boundingBox();
  expect(panelBounds.x).toBeGreaterThan(400);
  await page.waitForFunction(() => {
    const bounds = document.querySelector('#source-dialog').getBoundingClientRect();
    return Math.abs(bounds.right - window.innerWidth) < 1;
  });
  await page.locator('[data-close-source]').click();
  await expect(sourceDialog).not.toBeVisible();
  await expect(sourceCards.nth(0)).toHaveAttribute('aria-pressed', 'false');
  await expect(sourceCards.nth(0)).toBeFocused();
  await sourceCards.nth(1).click();
  await expect(sourceDialog).toBeVisible();
  await expect(page.locator('#source-detail h3')).toHaveText('Diário Oficial da União');
  await expect(page.locator('#source-detail')).toContainText('Resolução CM-CMED');
  await page.keyboard.press('Escape');
  await expect(sourceDialog).not.toBeVisible();
  await expect(sourceCards.nth(1)).toBeFocused();
  await sourceCards.nth(2).click();
  await expect(page.locator('#source-detail h3')).toHaveText('Câmara dos Deputados');
  await expect(page.locator('#source-detail')).toContainText('Assuntos anteriores em acompanhamento');
  await expect(page.locator('.site-header nav')).toHaveCount(0);
  await expect(page).not.toHaveURL(/#source-/);
});

test('cards de fonte permanecem no panorama e recentes têm separação visual no painel', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator('#source-overview-list [data-source-target="anvisa"]').click();
  const recentCards = page.locator('#source-detail .source-group:not(.source-group--followed) > .event-card');
  await expect(recentCards).toHaveCount(2);
  const first = await recentCards.nth(0).boundingBox();
  const second = await recentCards.nth(1).boundingBox();
  expect(second.y - (first.y + first.height)).toBeGreaterThanOrEqual(8);
});

test('indicadores abrem fórmula, período e registros do conjunto local', async ({ page }) => {
  await page.goto('/');
  const indicators = page.locator('.indicator');
  await expect(indicators).toHaveCount(3);
  await expect(page.locator('.indicator-explanation')).toHaveCount(0);
  await expect(indicators.nth(0).locator('strong')).toHaveText('2');
  await expect(indicators.nth(1).locator('strong')).toHaveText('3');
  await expect(indicators.nth(2).locator('strong')).toHaveText('1');
  await indicators.nth(0).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Conta uma vez cada assunto');
  await expect(dialog.locator('.indicator-explanation')).toContainText(
    'O número descreve esta amostra, não o total de publicações oficiais.',
  );
  await expect(dialog).toContainText('15 de outubro de 2026');
  await expect(dialog).toContainText('SNCR');
  await page.keyboard.press('Escape');
  await indicators.nth(2).click();
  await expect(dialog.locator('.indicator-explanation')).toContainText('Cada prazo é contado uma vez.');
  await page.keyboard.press('Escape');
});

test('análise abre modal com abas, evidências ligadas às afirmações e foco restaurado', async ({ page }) => {
  await page.goto('/');
  const opener = page.getByRole('button', { name: 'Ver análise' }).first();
  await opener.focus();
  await opener.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('tab', { name: 'Análise' })).toHaveAttribute('aria-selected', 'true');
  await expect(dialog.getByRole('tabpanel', { name: 'Análise' })).toContainText('Prazo aplicável');
  await expect(dialog).toContainText('receitas em papel continuam como opção');
  const evidenceTab = dialog.getByRole('tab', { name: 'Evidências e metodologia' });
  await evidenceTab.focus();
  await page.keyboard.press('Enter');
  const evidencePanel = dialog.getByRole('tabpanel', { name: 'Evidências e metodologia' });
  await expect(evidencePanel).toContainText('Afirmações e evidências');
  await expect(evidencePanel).toContainText('Fato documentado');
  await expect(evidencePanel).toContainText('Início de nova etapa do SNCR');
  await expect(evidencePanel).toContainText('Classificações demonstrativas');
  await expect(evidencePanel.locator('.claim-evidence')).toHaveCount(3);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('links externos seguros e ausência de funcionalidades excluídas ou controles mortos', async ({
  page,
}) => {
  await page.goto('/');
  const links = await page
    .locator('a[target="_blank"]')
    .evaluateAll((anchors) => anchors.map((anchor) => ({ href: anchor.href, rel: anchor.rel })));
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    expect(new URL(link.href).protocol).toMatch(/^https?:$/);
    expect(link.rel).toContain('noopener');
    expect(link.href).not.toMatch(/example\.com|localhost|#$/);
  }
  await expect(page.getByText('Base de Conhecimento')).toHaveCount(0);
  await expect(page.getByText('Notificações')).toHaveCount(0);
  await expect(page.getByText('Adicionar documento')).toHaveCount(0);
  await expect(page.getByText('Validar e incorporar')).toHaveCount(0);
  expect(
    await page
      .locator('button')
      .evaluateAll((buttons) =>
        buttons.some(
          (button) =>
            !button.dataset.openEvent &&
            !button.dataset.openIndicator &&
            !button.dataset.sourceTarget &&
            !button.hasAttribute('data-close-source') &&
            !button.hasAttribute('data-close-dialog'),
        ),
      ),
  ).toBe(false);
});
