const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isDateOrNull = (value) =>
  value === null || (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value));

function uniqueById(items, label, errors) {
  const seen = new Set();
  for (const item of items) {
    if (!item?.id || seen.has(item.id))
      errors.push(`${label}: id ausente ou duplicado (${item?.id ?? 'sem id'}).`);
    seen.add(item?.id);
  }
}

export function validateData({ sources, events, editorial }) {
  const errors = [];
  if (!Array.isArray(sources) || !Array.isArray(events) || !isObject(editorial)) {
    return ['Estrutura de dados inválida: fontes, acontecimentos ou editorial ausentes.'];
  }
  uniqueById(sources, 'Fonte', errors);
  uniqueById(events, 'Acontecimento', errors);
  const sourceIds = new Set(sources.map((source) => source.id));
  const eventIds = new Set(events.map((event) => event.id));

  for (const source of sources) {
    if (
      !source.name ||
      !source.scope ||
      !isDateOrNull(source.lastVerificationAt) ||
      !isDateOrNull(source.lastAnalysisAt)
    )
      errors.push(`Fonte ${source.id}: campos básicos ou datas inválidos.`);
    if (!Array.isArray(source.summaryEventIds))
      errors.push(`Fonte ${source.id}: summaryEventIds deve ser uma lista.`);
    else
      for (const id of source.summaryEventIds)
        if (!eventIds.has(id))
          errors.push(`Fonte ${source.id}: acontecimento referenciado inexistente (${id}).`);
    const preservedIds = source.lastValidSummary?.eventIds ?? [];
    for (const id of preservedIds)
      if (!eventIds.has(id))
        errors.push(`Fonte ${source.id}: último resumo referencia acontecimento inexistente (${id}).`);
  }

  for (const event of events) {
    if (!sourceIds.has(event.sourceId))
      errors.push(`Acontecimento ${event.id}: fonte inexistente (${event.sourceId}).`);
    if (
      !event.subjectId ||
      !event.title ||
      !event.factualSummary ||
      !isDateOrNull(event.publicationDate) ||
      !isDateOrNull(event.lastMovementDate)
    )
      errors.push(`Acontecimento ${event.id}: campos essenciais inválidos.`);
    const claimIds = new Set((event.claims ?? []).map((claim) => claim.id));
    uniqueById(event.evidence ?? [], `Evidência de ${event.id}`, errors);
    for (const evidence of event.evidence ?? []) {
      if (!claimIds.has(evidence.claimId))
        errors.push(
          `Acontecimento ${event.id}: evidência ${evidence.id} referencia afirmação inexistente (${evidence.claimId}).`,
        );
      if (!evidence.documentId || !isDateOrNull(evidence.documentDate) || !evidence.officialUrl)
        errors.push(`Acontecimento ${event.id}: evidência ${evidence.id} incompleta.`);
    }
    for (const claim of event.claims ?? []) {
      if (!['fact', 'hypothesis'].includes(claim.type) || !claim.text)
        errors.push(`Acontecimento ${event.id}: afirmação ${claim.id} inválida.`);
    }
    for (const axis of ['relevance', 'impact', 'urgency']) {
      const classification = event.classifications?.[axis];
      if (
        !classification?.value ||
        !classification.justification ||
        !Array.isArray(classification.evidenceIds)
      )
        errors.push(`Acontecimento ${event.id}: classificação ${axis} incompleta.`);
      else
        for (const id of classification.evidenceIds)
          if (!(event.evidence ?? []).some((evidence) => evidence.id === id))
            errors.push(
              `Acontecimento ${event.id}: classificação ${axis} referencia evidência inexistente (${id}).`,
            );
    }
    if (
      event.recommendation &&
      !['Acompanhar', 'Avaliar', 'Considerar atuação'].includes(event.recommendation.type)
    )
      errors.push(`Acontecimento ${event.id}: recomendação não permitida.`);
    for (const id of event.recommendation?.evidenceClaimIds ?? [])
      if (!claimIds.has(id))
        errors.push(`Acontecimento ${event.id}: recomendação referencia afirmação inexistente (${id}).`);
  }

  if (
    !isDateOrNull(editorial.referenceDate) ||
    !Number.isInteger(editorial.windowDays) ||
    editorial.windowDays < 1
  )
    errors.push('Editorial: referenceDate ou windowDays inválidos.');
  for (const id of editorial.crossSourceSynthesis?.eventIds ?? [])
    if (!eventIds.has(id)) errors.push(`Síntese referencia acontecimento inexistente (${id}).`);
  return errors;
}
