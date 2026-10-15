import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { validateData } from '../../src/js/data/validate.js';
import { getWindowStart } from '../../src/js/utils/dates.js';
import {
  getFollowedSubjects,
  getHighlights,
  getRecentEvents,
  getSupportedClaims,
  getSourceDisplayStatus,
  getSynthesisSupport,
  hasEvidenceForClaim,
  isEligibleForPublicAnalysis,
} from '../../src/js/domain/report.js';

const sources = JSON.parse(await readFile(new URL('../../src/data/sources.json', import.meta.url)));
const events = JSON.parse(await readFile(new URL('../../src/data/events.json', import.meta.url)));
const editorial = JSON.parse(await readFile(new URL('../../src/data/editorial.json', import.meta.url)));
const sncr = events.find((event) => event.id === 'sncr-transition-2026');

function clone(value) {
  return structuredClone(value);
}

test('RN-01 highlights only high relevance with high impact or high urgency, inside the recent window', () => {
  const makeEvent = (relevance, impact, urgency, publicationDate = '2026-10-01') => ({
    ...clone(sncr),
    publicationDate,
    lastMovementDate: null,
    classifications: {
      ...clone(sncr.classifications),
      relevance: { ...sncr.classifications.relevance, value: relevance },
      impact: { ...sncr.classifications.impact, value: impact },
      urgency: { ...sncr.classifications.urgency, value: urgency },
    },
  });
  const truthTable = [
    ['alta', 'alto', 'baixa', true],
    ['alta', 'medio', 'alta', true],
    ['alta', 'medio', 'baixa', false],
    ['media', 'alto', 'alta', false],
    ['baixa', 'alto', 'alta', false],
  ];
  for (const [relevance, impact, urgency, expected] of truthTable) {
    assert.equal(getHighlights([makeEvent(relevance, impact, urgency)], '2026-10-15').length > 0, expected);
  }
  assert.equal(getHighlights([makeEvent('alta', 'alto', 'baixa', '2026-09-15')], '2026-10-15').length, 0);
});

test('RN-02 publishes medium relevance analysis, hides low relevance, and does not promote medium to highlight', () => {
  const medium = clone(events.find((event) => event.id === 'cmed-price-adjustment-2026'));
  const low = {
    ...clone(medium),
    classifications: {
      ...medium.classifications,
      relevance: { ...medium.classifications.relevance, value: 'baixa' },
    },
  };
  assert.equal(isEligibleForPublicAnalysis(medium), true);
  assert.equal(isEligibleForPublicAnalysis(low), false);
  assert.equal(getHighlights([medium], editorial.referenceDate, editorial.windowDays).length, 0);
});

test('RN-03/RN-04/RN-05 use a fixed 30-day calendar window and recognize recent movement on an older item', () => {
  const within = { ...clone(sncr), publicationDate: '2026-09-16', lastMovementDate: null };
  const boundary = { ...clone(sncr), publicationDate: '2026-09-15', lastMovementDate: null };
  const movedOld = { ...clone(sncr), publicationDate: '2025-09-15', lastMovementDate: '2026-10-01' };
  assert.deepEqual(
    getRecentEvents([within, boundary], '2026-10-15').map((event) => event.publicationDate),
    ['2026-09-16'],
  );
  assert.equal(getRecentEvents([movedOld], '2026-10-15').length, 1);
  assert.equal(getRecentEvents([{ ...within, lastMovementDate: null }], '2026-10-15').length, 1);
  assert.equal(getWindowStart('2026-10-15', 30), '2026-09-16');
});

test('old followed topics require a continuity reason and remain separate from recent items', () => {
  const old = clone(events.find((event) => event.id === 'pl-2664-2025'));
  const unsupportedFollowUp = {
    ...clone(old),
    id: 'old-unjustified',
    subjectId: 'old-unjustified',
    followUpReason: null,
  };
  assert.deepEqual(
    getFollowedSubjects([old, unsupportedFollowUp], '2026-10-15').map((event) => event.id),
    [old.id],
  );
  assert.equal(getRecentEvents([old], '2026-10-15').length, 0);
  const renewed = {
    ...clone(old),
    id: 'pl-2664-recent-movement',
    publicationDate: old.publicationDate,
    lastMovementDate: '2026-10-01',
  };
  assert.deepEqual(getFollowedSubjects([old, renewed], '2026-10-15'), []);
});

test('metrics use supplied records, unique subjects and only official future deadlines', async () => {
  const { getIndicators } = await import('../../src/js/domain/indicators.js');
  const duplicatedSubject = {
    ...clone(events.find((event) => event.id === 'pl-2664-2025')),
    id: 'pl-2664-amended-copy',
  };
  const indicators = getIndicators({
    sources,
    events: [...events, duplicatedSubject],
    referenceDate: '2026-10-15',
    windowDays: 30,
  });
  assert.deepEqual(
    indicators.map((item) => [item.id, item.value]),
    [
      ['recent', 2],
      ['followed', 3],
      ['deadlines', 1],
    ],
  );
  const onlyOne = getIndicators({ sources, events: [sncr], referenceDate: '2026-10-15', windowDays: 30 });
  assert.deepEqual(
    onlyOne.map((item) => item.value),
    [1, 0, 1],
  );
  const recentDuplicate = { ...clone(events[0]), id: 'duplicate-sncr-record' };
  assert.equal(
    getIndicators({ events: [events[0], recentDuplicate], referenceDate: '2026-10-15' })[0].value,
    1,
  );
  assert.deepEqual(
    indicators[2].deadlines.map((item) => item.id),
    ['sncr-rce-integration-2026-10-30'],
  );
});

test('RN-06 keeps relevance, impact and urgency independent and supported', () => {
  assert.equal(sncr.classifications.relevance.value, 'alta');
  assert.equal(sncr.classifications.impact.value, 'medio');
  assert.equal(sncr.classifications.urgency.value, 'alta');
  for (const classification of Object.values(sncr.classifications)) {
    assert.ok(classification.justification);
    assert.ok(classification.evidenceIds.length);
  }
});

test('RN-08/RN-09 suppress claims without official evidence and distinguishes facts from hypotheses', () => {
  assert.ok(sncr.claims.some((claim) => claim.type === 'fact'));
  assert.ok(sncr.claims.some((claim) => claim.type === 'hypothesis'));
  const unsupported = { ...clone(sncr), evidence: [] };
  assert.equal(hasEvidenceForClaim(unsupported, 'sncr-hypothesis'), false);
  assert.equal(isEligibleForPublicAnalysis(unsupported), false);
  const unsupportedHypothesis = {
    ...clone(sncr),
    evidence: sncr.evidence.filter((item) => item.claimId !== 'sncr-hypothesis'),
  };
  assert.equal(isEligibleForPublicAnalysis(unsupportedHypothesis), true);
  assert.equal(
    getSupportedClaims(unsupportedHypothesis).some((claim) => claim.type === 'hypothesis'),
    false,
  );
});

test('RN-10/RN-14 validate synthesis references and return a controlled error for missing IDs', () => {
  assert.equal(getSynthesisSupport(['sncr-transition-2026'], events)[0].id, 'sncr-transition-2026');
  assert.throws(() => getSynthesisSupport(['missing-event'], events), /inexistente/);
  const invalidEditorial = {
    ...editorial,
    crossSourceSynthesis: { ...editorial.crossSourceSynthesis, eventIds: ['missing-event'] },
  };
  assert.ok(
    validateData({ sources, events, editorial: invalidEditorial }).some((message) =>
      message.includes('inexistente'),
    ),
  );
});

test('RN-12/RN-13 distinguish no updates, source errors, preserved output and unverified state', () => {
  assert.equal(
    getSourceDisplayStatus({ updateStatus: 'success', summaryEventIds: ['current'] }).code,
    'success',
  );
  assert.equal(
    getSourceDisplayStatus({ updateStatus: 'no-updates', summaryEventIds: [] }).code,
    'no-updates',
  );
  assert.equal(
    getSourceDisplayStatus({
      updateStatus: 'error',
      summaryEventIds: ['must-not-leak'],
      lastValidSummary: null,
    }).code,
    'error',
  );
  assert.deepEqual(
    getSourceDisplayStatus({
      updateStatus: 'error',
      summaryEventIds: ['must-not-leak'],
      lastValidSummary: null,
    }).eventIds,
    [],
  );
  assert.deepEqual(
    getSourceDisplayStatus({
      updateStatus: 'error',
      summaryEventIds: [],
      lastValidSummary: { eventIds: ['kept'] },
    }),
    {
      code: 'stale',
      label: 'Falha na consulta; último resultado válido preservado',
      eventIds: ['kept'],
    },
  );
  assert.equal(getSourceDisplayStatus(sources[0]).code, 'unverified');
  assert.equal(getSourceDisplayStatus(sources[0]).label, '');
  assert.equal(
    getSourceDisplayStatus({ updateStatus: 'unavailable', summaryEventIds: ['hidden'] }).code,
    'unavailable',
  );
  assert.deepEqual(
    getSourceDisplayStatus({ updateStatus: 'unavailable', summaryEventIds: ['hidden'] }).eventIds,
    [],
  );
});
