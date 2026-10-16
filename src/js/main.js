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

function initializeSourceNetwork() {
  const section = document.querySelector('.source-overview');
  if (!section) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  const updateCircleScale = () => {
    const { width, height } = section.getBoundingClientRect();
    if (width && height) section.style.setProperty('--network-circle-x', `${(height * 1200 / (width * 420)).toFixed(4)}`);
  };
  updateCircleScale();
  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(updateCircleScale) : null;
  resizeObserver?.observe(section);
  if (!resizeObserver) window.addEventListener('resize', updateCircleScale, { passive: true });
  const sync = () => {
    section.classList.toggle('network-running', visible && !document.hidden && !reducedMotion.matches);
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) section.classList.add('network-entered');
      sync();
    });
    observer.observe(section);
  } else {
    visible = true;
    section.classList.add('network-entered');
    sync();
  }
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
}

function initializeSynthesisNetwork() {
  const section = document.querySelector('.synthesis');
  if (!section) return;
  const ns = 'http://www.w3.org/2000/svg';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const layer = document.createElement('div');
  layer.className = 'intelligence-background';
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  section.prepend(layer);
  let visible = false;

  const make = (name, attributes = {}) => {
    const node = document.createElementNS(ns, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };
  const sync = () => {
    section.classList.toggle('network-running', visible && !document.hidden && !reducedMotion.matches);
  };
  const build = () => {
    const width = section.clientWidth;
    const height = section.clientHeight;
    if (!width || !height) return;
    const compact = width <= 700;
    const left = compact ? 5 : 12;
    const right = width - left;
    const top = 2;
    const bottom = Math.max(top + 1, height - 5);
    const middle = height * 0.52;
    const routes = [
      {
        d: `M ${right} ${top} V ${middle - 34} C ${right} ${middle - 12} ${right - 30} ${middle - 12} ${right - 30} ${middle} S ${right} ${middle + 22} ${right} ${middle + 42} V ${bottom}`,
        delay: 0,
        start: [right, top],
        end: [right, bottom],
      },
    ];
    if (!compact) {
      routes.push({
        d: `M ${left} ${top} V ${middle - 26} C ${left} ${middle - 6} ${left + 28} ${middle - 6} ${left + 28} ${middle + 14} S ${left} ${middle + 32} ${left} ${middle + 52} V ${bottom}`,
        delay: -3.6,
        start: [left, top],
        end: [left, bottom],
      });
    }

    const svg = make('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'none',
      'aria-hidden': 'true',
      focusable: 'false',
    });
    const defs = make('defs');
    const mask = make('mask', {
      id: 'synthesis-network-quiet',
      maskUnits: 'userSpaceOnUse',
      x: 0,
      y: 0,
      width,
      height,
      'mask-type': 'luminance',
    });
    mask.append(make('rect', { width, height, fill: 'white' }));
    const sectionBounds = section.getBoundingClientRect();
    section.querySelectorAll('.decision-card__type, .decision-card__recommendation').forEach((text) => {
      const bounds = text.getBoundingClientRect();
      mask.append(make('rect', {
        x: bounds.left - sectionBounds.left - 7,
        y: bounds.top - sectionBounds.top - 5,
        width: bounds.width + 14,
        height: bounds.height + 10,
        rx: 3,
        fill: 'black',
      }));
    });
    defs.append(mask);
    const network = make('g', { mask: 'url(#synthesis-network-quiet)' });
    routes.forEach(({ d, delay, start, end }) => {
      const path = make('path', { d, pathLength: 1, class: 'network-path' });
      network.append(path);
      const packet = make('circle', { r: 1.7, class: 'network-packet' });
      packet.style.setProperty('--flow-delay', `${delay}s`);
      packet.style.offsetPath = `path('${d}')`;
      network.append(packet);
      const insight = make('circle', { cx: end[0], cy: end[1], r: 2, class: 'network-insight' });
      const halo = make('circle', { cx: end[0], cy: end[1], r: 5, class: 'network-halo' });
      insight.style.setProperty('--flow-delay', `${delay}s`);
      halo.style.setProperty('--flow-delay', `${delay}s`);
      network.append(insight, halo);
    });
    svg.append(defs, network);
    layer.replaceChildren(svg);
    section.classList.toggle('network-entered', visible || !('IntersectionObserver' in window));
    sync();
  };

  const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(build) : null;
  resizeObserver?.observe(section);
  if (!resizeObserver) window.addEventListener('resize', build, { passive: true });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) section.classList.add('network-entered');
      sync();
    });
    observer.observe(section);
  } else {
    visible = true;
  }
  build();
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
}

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

function setSource(sourceId) {
  if (!updateSourceDetail(sourceId, state.model)) return;
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  document.getElementById('source-detail').scrollIntoView({ behavior, block: 'start' });
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
      setSource(sourceButton.dataset.sourceTarget);
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
    updateSourceDetail('anvisa', state.model);
    connectInteractions();
    initializeSourceNetwork();
    initializeSynthesisNetwork();
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
