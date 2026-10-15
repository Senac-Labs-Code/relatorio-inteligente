import { element, externalLink } from '../utils/dom.js';
import { formatDate } from '../utils/dates.js';
import { getSupportedClaims, hasEvidenceForClaim } from '../domain/report.js';

function makeTab(id, label, selected) {
  const button = element('button', 'detail-tab', label);
  button.type = 'button';
  button.id = `${id}-tab`;
  button.dataset.dialogTab = id;
  button.setAttribute('role', 'tab');
  button.setAttribute('aria-controls', `${id}-panel`);
  button.setAttribute('aria-selected', String(selected));
  button.tabIndex = selected ? 0 : -1;
  return button;
}

function makePanel(id, labelledBy, selected) {
  const panel = element('section', 'detail-panel');
  panel.id = `${id}-panel`;
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('aria-labelledby', labelledBy);
  panel.tabIndex = 0;
  panel.hidden = !selected;
  return panel;
}

function appendClaimEvidence(parent, event, claim) {
  const article = element('article', 'claim-evidence');
  article.append(
    element('p', 'claim-evidence__type', claim.type === 'fact' ? 'Fato documentado' : 'Hipótese'),
    element('h4', '', claim.text),
  );
  const evidence = event.evidence.filter(
    (item) => item.claimId === claim.id && item.supportsClaim && /^https?:\/\//i.test(item.officialUrl),
  );
  if (!evidence.length) return;
  const list = element('ul', 'claim-evidence__sources');
  evidence.forEach((item) => {
    const row = element('li', 'claim-evidence__source');
    const meta = element('p', 'evidence-item__meta', `${item.documentId} · ${item.fragmentReference}`);
    const title = element('strong', '', item.documentTitle);
    const date = element('time', '', formatDate(item.documentDate));
    date.dateTime = item.documentDate;
    const excerpt = element('blockquote', '', item.textOrFaithfulParaphrase);
    row.append(meta, title, date, excerpt, externalLink(item.officialUrl, 'Abrir documento oficial'));
    list.append(row);
  });
  article.append(list);
  parent.append(article);
}

function renderAnalysis(panel, event) {
  const fact = element('section', 'analysis-section');
  fact.append(element('h3', '', 'O que o documento estabelece'), element('p', '', event.factualSummary));
  panel.append(fact);

  if (event.changes.length) {
    const changes = element('section', 'analysis-section');
    changes.append(element('h3', '', 'O que mudou'));
    const list = element('ul', 'detail-list');
    event.changes.forEach((change) => list.append(element('li', '', change.text)));
    changes.append(list);
    panel.append(changes);
  }

  const impacts = event.possibleImpacts.filter((item) => hasEvidenceForClaim(event, item.claimId));
  if (impacts.length || event.affectedGroups.length) {
    const section = element('section', 'analysis-section');
    section.append(
      element('h3', '', impacts.length ? 'Possíveis efeitos' : 'Grupos potencialmente afetados'),
    );
    if (impacts.length) {
      section.append(
        element(
          'p',
          'detail-disclaimer',
          'Interpretação demonstrativa; não é obrigação estabelecida pela fonte oficial.',
        ),
      );
      const list = element('ul', 'detail-list');
      impacts.forEach((item) => list.append(element('li', '', item.text)));
      section.append(list);
    }
    if (event.affectedGroups.length) {
      if (impacts.length) section.append(element('p', 'detail-label', 'Grupos potencialmente afetados'));
      section.append(element('p', 'detail-inline', event.affectedGroups.join(' · ')));
    }
    panel.append(section);
  }

  if (event.deadlines.length) {
    const section = element('section', 'analysis-section');
    section.append(element('h3', '', 'Prazo aplicável'));
    const list = element('ul', 'detail-list');
    event.deadlines.forEach((item) => {
      const row = element('li');
      const date = element('time', '', formatDate(item.date));
      date.dateTime = item.date;
      row.append(date, document.createTextNode(` — ${item.description}`));
      list.append(row);
    });
    section.append(list);
    panel.append(section);
  }

  const recommendationSupported =
    event.recommendation &&
    event.recommendation.evidenceClaimIds.every((claimId) => hasEvidenceForClaim(event, claimId));
  if (recommendationSupported) {
    const section = element('section', 'analysis-section');
    section.append(
      element('h3', '', 'Possível ação institucional'),
      element('p', '', `${event.recommendation.type}: ${event.recommendation.text}`),
      element(
        'p',
        'detail-disclaimer',
        'Sugestão editorial; não expressa decisão oficial nem executa uma ação.',
      ),
    );
    panel.append(section);
  }
}

function renderMethodology(panel, event) {
  const claims = getSupportedClaims(event);
  const evidenceSection = element('section', 'analysis-section');
  evidenceSection.append(element('h3', '', 'Afirmações e evidências'));
  claims.forEach((claim) => appendClaimEvidence(evidenceSection, event, claim));
  panel.append(evidenceSection);

  const classification = element('section', 'analysis-section');
  classification.append(element('h3', '', 'Critérios editoriais desta amostra'));
  const axisList = element('dl', 'classification-list');
  const labels = {
    relevance: ['Relevância', { alta: 'alta', media: 'média', baixa: 'baixa' }],
    impact: ['Impacto', { alto: 'alto', medio: 'médio', baixo: 'baixo' }],
    urgency: ['Urgência', { alta: 'alta', media: 'média', baixa: 'baixa' }],
  };
  for (const [key, [label, values]] of Object.entries(labels)) {
    const axis = event.classifications[key];
    axisList.append(
      element('dt', '', `${label}: ${values[axis.value] ?? axis.value}`),
      element('dd', '', axis.justification),
    );
  }
  classification.append(
    axisList,
    element(
      'p',
      'detail-disclaimer',
      'Classificações demonstrativas, sujeitas à validação institucional da metodologia.',
    ),
  );
  panel.append(classification);

  const method = element('section', 'analysis-section');
  method.append(element('h3', '', 'Etapas demonstrativas'));
  const steps = element('ol', 'steps-list');
  event.processingSteps.forEach((step) => steps.append(element('li', '', step)));
  method.append(
    steps,
    element(
      'p',
      'detail-disclaimer',
      'Representação do fluxo previsto; não são logs de execução nem raciocínio interno de modelo.',
    ),
  );
  panel.append(method);
}

export function renderEventDetails(container, event) {
  container.replaceChildren();
  const sourceName = event.issuer;
  const header = element('header', 'detail-intro');
  header.append(element('p', 'eyebrow', `${sourceName} · ${event.type} · ${event.officialIdentifier}`));
  const title = element('h2', '', event.title);
  title.id = 'dialog-title';
  header.append(title);
  const metadata = element('p', 'detail-date');
  metadata.append(document.createTextNode('Publicado em '));
  const published = element('time', '', formatDate(event.publicationDate));
  published.dateTime = event.publicationDate;
  metadata.append(published);
  if (event.lastMovementDate) {
    metadata.append(document.createTextNode(' · movimentado em '));
    const moved = element('time', '', formatDate(event.lastMovementDate));
    moved.dateTime = event.lastMovementDate;
    metadata.append(moved);
  }
  header.append(metadata, element('p', 'detail-status', event.status));
  container.append(header);

  const tabs = element('div', 'detail-tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Conteúdo da análise');
  tabs.append(makeTab('analysis', 'Análise', true), makeTab('evidence', 'Evidências e metodologia', false));
  container.append(tabs);
  const analysis = makePanel('analysis', 'analysis-tab', true);
  const evidence = makePanel('evidence', 'evidence-tab', false);
  renderAnalysis(analysis, event);
  renderMethodology(evidence, event);
  container.append(analysis, evidence);
}

export function renderIndicatorDetails(container, indicator, events) {
  container.replaceChildren();
  const title = element('h2', '', `${indicator.value} ${indicator.label}`);
  title.id = 'dialog-title';
  container.append(element('p', 'eyebrow', 'Indicador do conjunto de referência'), title);
  container.append(element('p', 'indicator-explanation', indicator.description));
  if (indicator.deadlines?.length) {
    const section = element('section', 'analysis-section');
    section.append(element('h3', '', 'Prazos considerados'));
    const deadlines = element('ul', 'detail-list');
    indicator.deadlines.forEach((deadline) => {
      const item = element('li');
      const date = element('time', '', formatDate(deadline.date));
      date.dateTime = deadline.date;
      item.append(date, document.createTextNode(` — ${deadline.description}`));
      deadlines.append(item);
    });
    section.append(deadlines);
    container.append(section);
  }
  if (!events.length) {
    container.append(element('p', 'empty-state', 'Nenhum registro compõe este indicador no cenário atual.'));
    return;
  }
  const list = element('ul', 'indicator-records');
  events.forEach((event) => {
    const item = element('li', 'indicator-record');
    const open = element('button', 'text-button', `${event.officialIdentifier} — ${event.title}`);
    open.type = 'button';
    open.dataset.openEvent = event.id;
    item.append(open);
    list.append(item);
  });
  container.append(list);
}

export function openDetailsDialog(dialog, content, render) {
  render(content);
  if (!dialog.open) dialog.showModal();
  dialog.querySelector('[data-close-dialog]').focus({ preventScroll: true });
}

export function activateDialogTab(dialog, tabId) {
  const buttons = [...dialog.querySelectorAll('[data-dialog-tab]')];
  const active = buttons.find((button) => button.dataset.dialogTab === tabId);
  if (!active) return;
  buttons.forEach((button) => {
    const selected = button === active;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    const panel = dialog.querySelector(`#${button.getAttribute('aria-controls')}`);
    panel.hidden = !selected;
  });
  active.focus();
}
