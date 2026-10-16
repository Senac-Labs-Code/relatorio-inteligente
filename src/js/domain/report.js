import { getLatestEventDate, isWithinWindow } from '../utils/dates.js';

export function hasEvidenceForClaim(event, claimId) {
  return (event.evidence ?? []).some(
    (evidence) =>
      evidence.claimId === claimId &&
      evidence.supportsClaim === true &&
      /^https?:\/\//i.test(evidence.officialUrl ?? ''),
  );
}

export function isPublicationSupported(event) {
  if (event.publicable !== true || !(event.claims?.length > 0)) return false;
  if (event.claims.some((claim) => claim.type === 'fact' && !hasEvidenceForClaim(event, claim.id)))
    return false;
  for (const axis of ['relevance', 'impact', 'urgency']) {
    const classification = event.classifications?.[axis];
    if (!classification?.justification || !classification.evidenceIds?.length) return false;
    if (
      classification.evidenceIds.some(
        (id) => !(event.evidence ?? []).some((evidence) => evidence.id === id && evidence.supportsClaim),
      )
    )
      return false;
  }
  return true;
}

export function getSupportedClaims(event) {
  return (event.claims ?? []).filter((claim) => hasEvidenceForClaim(event, claim.id));
}

export function isEligibleForPublicAnalysis(event) {
  return ['media', 'alta'].includes(event.classifications?.relevance?.value) && isPublicationSupported(event);
}

export function getRecentEvents(events, referenceDate, windowDays = 30) {
  return events.filter((event) => {
    const candidates = [event.publicationDate, event.lastMovementDate].filter(Boolean);
    return candidates.some((date) => isWithinWindow(date, referenceDate, windowDays));
  });
}

export function getFollowedSubjects(events, referenceDate, windowDays = 30) {
  const recentlyActiveSubjects = new Set(
    getRecentEvents(events, referenceDate, windowDays).map((event) => event.subjectId),
  );
  const oldEvents = events.filter(
    (event) =>
      event.isActive === true &&
      Boolean(event.followUpReason) &&
      !recentlyActiveSubjects.has(event.subjectId) &&
      !getRecentEvents([event], referenceDate, windowDays).length &&
      isEligibleForPublicAnalysis(event),
  );
  const subjects = new Map();
  for (const event of oldEvents) {
    const current = subjects.get(event.subjectId);
    if (!current || getLatestEventDate(event) > getLatestEventDate(current))
      subjects.set(event.subjectId, event);
  }
  return [...subjects.values()];
}

export function getHighlights(events, referenceDate, windowDays = 30) {
  return getRecentEvents(events, referenceDate, windowDays).filter(
    (event) =>
      isEligibleForPublicAnalysis(event) &&
      event.classifications.relevance.value === 'alta' &&
      (event.classifications.impact.value === 'alto' || event.classifications.urgency.value === 'alta'),
  );
}

export function getEventsBySource(
  events,
  sourceId,
  { referenceDate, windowDays = 30, group = 'recent' } = {},
) {
  const eligible = events.filter(
    (event) => event.sourceId === sourceId && isEligibleForPublicAnalysis(event),
  );
  if (group === 'recent') return getRecentEvents(eligible, referenceDate, windowDays);
  if (group === 'followed')
    return getFollowedSubjects(
      eligible.filter((event) => event.sourceId === sourceId),
      referenceDate,
      windowDays,
    );
  return [];
}

export function getSourceDisplayStatus(source) {
  if (source.updateStatus === 'error' && source.lastValidSummary?.eventIds?.length) {
    return {
      code: 'stale',
      label: 'Falha na consulta; último resultado válido preservado',
      eventIds: source.lastValidSummary.eventIds,
    };
  }
  const statuses = {
    success: { code: 'success', label: 'Consulta realizada' },
    'no-updates': { code: 'no-updates', label: 'Consulta sem novidades' },
    error: { code: 'error', label: 'Falha na consulta; sem resultado anterior disponível' },
    unavailable: { code: 'unavailable', label: 'Informação não disponível' },
    unverified: { code: 'unverified', label: '' },
  };
  const eventIds = ['error', 'unavailable'].includes(source.updateStatus)
    ? []
    : (source.summaryEventIds ?? []);
  return { ...(statuses[source.updateStatus] ?? statuses.unavailable), eventIds };
}

export function createReportModel({ sources, events, editorial }) {
  const sourceStates = new Map(sources.map((source) => [source.id, getSourceDisplayStatus(source)]));
  const availableEvents = events.filter((event) => {
    const state = sourceStates.get(event.sourceId);
    if (!state) return false;
    return (
      state.eventIds.includes(event.id) ||
      (state.code === 'unverified' && sourceStates.get(event.sourceId).eventIds.includes(event.id))
    );
  });
  const publicEvents = availableEvents.filter(isEligibleForPublicAnalysis);
  const recent = getRecentEvents(publicEvents, editorial.referenceDate, editorial.windowDays);
  const followed = getFollowedSubjects(publicEvents, editorial.referenceDate, editorial.windowDays);
  const recommendations = publicEvents.flatMap((event) => {
    const recommendation = event.recommendation;
    if (
      !recommendation?.type ||
      !recommendation.text ||
      !Array.isArray(recommendation.evidenceClaimIds) ||
      recommendation.evidenceClaimIds.length === 0 ||
      !recommendation.evidenceClaimIds.every((claimId) => hasEvidenceForClaim(event, claimId))
    )
      return [];
    return [{ event, recommendation }];
  }).sort((first, second) => {
    const priority = (value) => ({ alta: 3, alto: 3, media: 2, medio: 2, baixa: 1, baixo: 1 })[value] ?? 0;
    return (
      priority(second.event.classifications.urgency.value) - priority(first.event.classifications.urgency.value) ||
      priority(second.event.classifications.relevance.value) - priority(first.event.classifications.relevance.value) ||
      priority(second.event.classifications.impact.value) - priority(first.event.classifications.impact.value) ||
      (second.event.publicationDate ?? '').localeCompare(first.event.publicationDate ?? '')
    );
  }).slice(0, 3);
  return {
    sources,
    events: publicEvents,
    recent,
    followed,
    highlights: getHighlights(publicEvents, editorial.referenceDate, editorial.windowDays),
    sourceStates,
    recommendations,
    editorial,
  };
}
