import { validateData } from './validate.js';

async function fetchJson(path) {
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Falha ao carregar ${path}: HTTP ${response.status}`);
  return response.json();
}

export async function loadReportData() {
  const [sources, events, editorial] = await Promise.all([
    fetchJson('/src/data/sources.json'),
    fetchJson('/src/data/events.json'),
    fetchJson('/src/data/editorial.json'),
  ]);
  const errors = validateData({ sources, events, editorial });
  if (errors.length) throw new Error(`Dados locais inválidos:\n${errors.join('\n')}`);
  return { sources, events, editorial };
}

export async function applyScenario(data, scenarioName) {
  if (!scenarioName || scenarioName === 'padrao') return data;
  const allowed = new Set(['sem-novidades', 'anvisa-indisponivel', 'sem-evidencias']);
  if (!allowed.has(scenarioName)) throw new Error(`Cenário demonstrativo desconhecido: ${scenarioName}`);
  const scenario = await fetchJson(`/src/data/scenarios/${scenarioName}.json`);
  const sources = data.sources.map((source) => ({
    ...source,
    ...(scenario.sourceOverrides?.[source.id] ?? {}),
  }));
  let events = data.events;
  if (scenario.eventIds) events = events.filter((event) => scenario.eventIds.includes(event.id));
  if (scenario.removeEvidenceFromEventIds) {
    const affected = new Set(scenario.removeEvidenceFromEventIds);
    events = events.map((event) => (affected.has(event.id) ? { ...event, evidence: [] } : event));
  }
  if (scenario.unsupportedClaimIds) {
    const claimIds = new Set(scenario.unsupportedClaimIds);
    events = events.map((event) => ({
      ...event,
      evidence: event.evidence.filter((item) => !claimIds.has(item.claimId)),
    }));
  }
  return { ...data, sources, events, scenario };
}
