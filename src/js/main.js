import { applyScenario, loadReportData } from './data/repository.js';
import { createReportModel } from './domain/report.js';
import { state } from './state.js';
import {
  activateDialogTab,
  openDetailsDialog,
  renderEventDetails,
  renderIndicatorDetails,
} from './ui/details-dialog.js';
import { renderReport, updateSourceDetail } from './ui/render-report.js';

const dialog = document.getElementById('event-dialog');
const dialogContent = document.getElementById('dialog-content');
const sourceDialog = document.getElementById('source-dialog');

function openEvent(eventId, opener) {
  const event = state.model.events.find((item) => item.id === eventId);
  if (!event) return;
  if (!dialog.open) state.dialogOpener = opener;
  openDetailsDialog(dialog, dialogContent, (content) => renderEventDetails(content, event));
}

function openIndicator(indicatorId, opener) {
  const indicator = state.indicators.find((item) => item.id === indicatorId);
  if (!indicator) return;
  state.dialogOpener = opener;
  openDetailsDialog(dialog, dialogContent, (content) =>
    renderIndicatorDetails(content, indicator, indicator.eventIds),
  );
}

function setSource(sourceId, opener) {
  if (!updateSourceDetail(sourceId, state.model)) return;
  state.selectedSourceId = sourceId;
  if (!sourceDialog.open) {
    state.sourceDialogOpener = opener;
    sourceDialog.showModal();
    sourceDialog.querySelector('[data-close-source]').focus();
  }
}

function trapDialogFocus(event) {
  if (event.key !== 'Tab') return;
  const focusable = [
    ...dialog.querySelectorAll(
      'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="tab"]',
    ),
  ].filter((item) => !item.hidden && item.tabIndex >= 0 && item.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function connectInteractions() {
  document.addEventListener('click', (event) => {
    const sourceButton = event.target.closest('[data-source-target]');
    if (sourceButton) {
      setSource(sourceButton.dataset.sourceTarget, sourceButton);
      return;
    }
    const eventButton = event.target.closest('[data-open-event]');
    if (eventButton) {
      openEvent(eventButton.dataset.openEvent, eventButton);
      return;
    }
    const indicatorButton = event.target.closest('[data-open-indicator]');
    if (indicatorButton) openIndicator(indicatorButton.dataset.openIndicator, indicatorButton);
  });

  dialog.querySelector('[data-close-dialog]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
    const tab = event.target.closest('[data-dialog-tab]');
    if (tab) activateDialogTab(dialog, tab.dataset.dialogTab);
  });
  dialog.addEventListener('keydown', (event) => {
    trapDialogFocus(event);
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const tab = event.target.closest('[data-dialog-tab]');
      if (!tab) return;
      event.preventDefault();
      const tabs = [...dialog.querySelectorAll('[data-dialog-tab]')];
      const currentIndex = tabs.indexOf(tab);
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(currentIndex + direction + tabs.length) % tabs.length];
      activateDialogTab(dialog, next.dataset.dialogTab);
    }
  });
  dialog.addEventListener('close', () => {
    if (state.dialogOpener?.isConnected) state.dialogOpener.focus({ preventScroll: true });
    state.dialogOpener = null;
  });

  sourceDialog.querySelector('[data-close-source]').addEventListener('click', () => sourceDialog.close());
  sourceDialog.addEventListener('click', (event) => {
    if (event.target === sourceDialog) sourceDialog.close();
  });
  sourceDialog.addEventListener('close', () => {
    document.querySelectorAll('[data-source-target]').forEach((button) => {
      button.setAttribute('aria-pressed', 'false');
    });
    state.selectedSourceId = null;
    if (state.sourceDialogOpener?.isConnected) {
      state.sourceDialogOpener.focus({ preventScroll: true });
    }
    state.sourceDialogOpener = null;
  });
}

function showLoadError(error) {
  const message = document.getElementById('load-message');
  message.textContent =
    'Não foi possível carregar os dados locais. Confira se o site está sendo servido por HTTP e tente recarregar.';
  message.setAttribute('role', 'alert');
  console.error('[Relatório Vivo] Falha ao iniciar a publicação:', error);
}

async function start() {
  try {
    const query = new URLSearchParams(location.search);
    const data = await applyScenario(await loadReportData(), query.get('cenario'));
    state.model = createReportModel(data);
    state.indicators = renderReport(state.model);
    state.selectedSourceId = null;
    connectInteractions();
    try {
      const { initializeMotion } = await import('./ui/motion.js');
      initializeMotion();
    } catch (error) {
      console.info('[Relatório Vivo] Efeitos opcionais indisponíveis; conteúdo preservado.', error);
    }
  } catch (error) {
    showLoadError(error);
  }
}

start();
