import { getIndicators } from '../domain/indicators.js';
import { getEventsBySource } from '../domain/report.js';
import { element, externalLink } from '../utils/dom.js';
import { formatDate, getWindowStart } from '../utils/dates.js';

function makeEventCard(event, sourceName, { highlighted = false, referenceDate = '2026-10-15' } = {}) {
  const article = element('article', highlighted ? 'event-card event-card--highlight' : 'event-card');
  const meta = element('p', 'event-card__meta');
  meta.append(element('span', '', sourceName), document.createTextNode(' · '));
  const dateValue = event.lastMovementDate ?? event.publicationDate;
  const date = element('time', '', formatDate(dateValue));
  date.dateTime = dateValue;
  meta.append(date, document.createTextNode(` · ${event.officialIdentifier}`));

  const heading = element('h4', '', event.title);
  const summary = element('p', 'event-card__summary', event.factualSummary);
  const controls = element('div', 'event-card__actions');
  const read = element('button', 'text-button', 'Ver análise');
  read.type = 'button';
  read.dataset.openEvent = event.id;
  controls.append(read, externalLink(event.officialUrls[0], 'Fonte oficial'));

  article.append(meta, heading, summary);
  const deadline = event.deadlines.find((item) => item.date >= referenceDate);
  if (deadline) {
    const deadlineText = element('p', 'event-card__deadline');
    deadlineText.append(document.createTextNode('Prazo '));
    const deadlineDate = element('time', '', formatDate(deadline.date));
    deadlineDate.dateTime = deadline.date;
    deadlineText.append(deadlineDate);
    article.append(deadlineText);
  }
  article.append(controls);
  if (highlighted) article.prepend(element('p', 'priority-label', `Destaque · ${sourceName}`));
  return article;
}

function renderEmpty(parent, message) {
  parent.append(element('p', 'empty-state', message));
}

function renderSourceOverview(source, model) {
  const button = element('button', 'source-picker__card');
  button.type = 'button';
  button.dataset.sourceTarget = source.id;
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-controls', 'source-detail');
  button.setAttribute('aria-haspopup', 'dialog');
  const status = model.sourceStates.get(source.id);
  button.append(
    element('span', 'source-picker__name', source.name),
    element('span', 'source-picker__summary', source.summary ?? source.scope),
  );
  if (status.code !== 'unverified') {
    button.append(element('span', `source-status source-status--${status.code}`, status.label));
  }
  button.append(element('span', 'source-picker__action', 'Ver acontecimentos'));
  return button;
}

function renderIndicators(model) {
  const container = document.getElementById('indicators');
  container.replaceChildren();
  const indicators = getIndicators({
    events: model.events,
    referenceDate: model.editorial.referenceDate,
    windowDays: model.editorial.windowDays,
  });
  for (const indicator of indicators) {
    const button = element('button', 'indicator');
    button.type = 'button';
    button.dataset.openIndicator = indicator.id;
    button.append(
      element('strong', '', String(indicator.value)),
      element('span', '', indicator.label),
      element('small', '', 'Consultar registros'),
    );
    indicator.eventIds = indicator.eventIds
      .map((id) => model.events.find((event) => event.id === id))
      .filter(Boolean);
    container.append(button);
  }
  return indicators;
}

function renderSourceDetail(source, model) {
  const container = element('div', 'source-detail__panel');
  container.dataset.sourceId = source.id;
  const state = model.sourceStates.get(source.id);
  const header = element(
    'header',
    state.code === 'unverified'
      ? 'source-detail__header source-detail__header--no-status'
      : 'source-detail__header',
  );
  const titleGroup = element('div');
  titleGroup.append(
    element('p', 'eyebrow', source.scope),
    element('h3', '', source.name),
    element('p', 'source-detail__summary', source.summary ?? source.coverageNote),
  );
  titleGroup.querySelector('h3').id = `source-title-${source.id}`;
  header.append(titleGroup);
  if (state.code !== 'unverified') {
    const status = element('div', 'source-detail__status');
    status.append(element('span', `source-status source-status--${state.code}`, state.label));
    const dates = [];
    if (source.lastVerificationAt) dates.push(`Verificada em ${formatDate(source.lastVerificationAt)}`);
    if (source.lastAnalysisAt) dates.push(`Analisada em ${formatDate(source.lastAnalysisAt)}`);
    if (dates.length) status.append(element('p', 'source-date', dates.join(' · ')));
    header.append(status);
  }
  container.append(header);

  if (state.code === 'stale') {
    container.append(
      element(
        'p',
        'source-state-note',
        'Falha de atualização demonstrativa; o resultado válido anterior foi mantido nesta visualização.',
      ),
    );
  } else if (state.code === 'no-updates') {
    container.append(element('p', 'source-state-note', 'Consulta demonstrativa concluída sem novidades.'));
  } else if (state.code === 'error' || state.code === 'unavailable') {
    container.append(element('p', 'source-state-note', state.label));
  }

  const recent = getEventsBySource(model.events, source.id, {
    referenceDate: model.editorial.referenceDate,
    windowDays: model.editorial.windowDays,
    group: 'recent',
  });
  const recentGroup = element('section', 'source-group');
  recentGroup.append(element('h4', '', 'Recentes · últimos 30 dias'));
  if (recent.length) {
    recent.forEach((event) => {
      recentGroup.append(
        makeEventCard(event, source.name, {
          highlighted: model.highlights.some((item) => item.id === event.id),
          referenceDate: model.editorial.referenceDate,
        }),
      );
    });
  } else {
    renderEmpty(recentGroup, 'Nenhum acontecimento recente consta nesta amostra.');
  }
  container.append(recentGroup);

  const followed = getEventsBySource(model.events, source.id, {
    referenceDate: model.editorial.referenceDate,
    windowDays: model.editorial.windowDays,
    group: 'followed',
  });
  const followedGroup = element('section', 'source-group source-group--followed');
  followedGroup.append(element('h4', '', 'Assuntos anteriores em acompanhamento'));
  if (followed.length) {
    const list = element('ul', 'followed-list');
    for (const event of followed) {
      const row = element('li', 'followed-list__item');
      const content = element('div');
      content.append(
        element(
          'p',
          'event-card__meta',
          `${event.officialIdentifier} · ${formatDate(event.publicationDate)}`,
        ),
        element('h5', '', event.title),
        element('p', 'followed-list__reason', event.followUpReason),
      );
      const open = element('button', 'text-button', 'Ver análise');
      open.type = 'button';
      open.dataset.openEvent = event.id;
      row.append(content, open);
      list.append(row);
    }
    followedGroup.append(list);
  } else {
    renderEmpty(followedGroup, 'Nenhum assunto antigo com justificativa nesta amostra.');
  }
  container.append(followedGroup);
  const mount = document.getElementById('source-detail');
  mount.dataset.sourceId = source.id;
  mount.replaceChildren(container);
}

export function renderReport(model) {
  const startDate = getWindowStart(model.editorial.referenceDate, model.editorial.windowDays);
  const start = document.getElementById('window-start');
  start.textContent = formatDate(startDate, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  start.dateTime = startDate;
  const end = document.getElementById('reference-date');
  end.textContent = formatDate(model.editorial.referenceDate);
  end.dateTime = model.editorial.referenceDate;
  document.getElementById('load-message').remove();

  const indicators = renderIndicators(model);
  const highlights = document.getElementById('highlights');
  highlights.replaceChildren();
  if (model.highlights.length) {
    model.highlights.forEach((event) => {
      const source = model.sources.find((item) => item.id === event.sourceId);
      highlights.append(
        makeEventCard(event, source?.name ?? event.issuer, {
          highlighted: true,
          referenceDate: model.editorial.referenceDate,
        }),
      );
    });
  } else {
    renderEmpty(highlights, 'Nenhum destaque atende aos critérios nesta janela.');
  }

  const synthesis = document.getElementById('synthesis');
  synthesis.replaceChildren();
  if (model.synthesisEvents.length) {
    synthesis.append(element('p', '', model.editorial.crossSourceSynthesis.text));
    const references = element('div', 'synthesis-references');
    model.synthesisEvents.forEach((event) => {
      const button = element('button', 'text-button', event.officialIdentifier);
      button.type = 'button';
      button.dataset.openEvent = event.id;
      references.append(button);
    });
    synthesis.append(references);
  } else {
    renderEmpty(synthesis, 'Síntese indisponível neste cenário.');
  }

  const sampleLimits = document.getElementById('sample-limits');
  sampleLimits.replaceChildren(
    element('p', '', model.editorial.sampleNature),
    element('p', '', model.editorial.coverageScope),
  );
  const limits = element('ul');
  model.editorial.limitations.forEach((item) => limits.append(element('li', '', item)));
  sampleLimits.append(limits);

  document
    .getElementById('source-overview-list')
    .replaceChildren(...model.sources.map((source) => renderSourceOverview(source, model)));
  return indicators;
}

export function updateSourceDetail(sourceId, model) {
  const source = model.sources.find((item) => item.id === sourceId);
  if (!source) return false;
  renderSourceDetail(source, model);
  document.querySelectorAll('[data-source-target]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.sourceTarget === sourceId));
  });
  return true;
}
