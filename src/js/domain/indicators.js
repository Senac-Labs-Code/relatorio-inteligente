import { getFollowedSubjects, getRecentEvents, isEligibleForPublicAnalysis } from './report.js';
import { formatDate, getWindowStart } from '../utils/dates.js';

export function getIndicators({ events, referenceDate, windowDays = 30 }) {
  const publicEvents = events.filter(isEligibleForPublicAnalysis);
  const recentBySubject = new Map();
  for (const event of getRecentEvents(publicEvents, referenceDate, windowDays)) {
    if (!recentBySubject.has(event.subjectId)) recentBySubject.set(event.subjectId, event);
  }
  const recent = [...recentBySubject.values()];
  const followed = getFollowedSubjects(publicEvents, referenceDate, windowDays);
  const periodStart = formatDate(getWindowStart(referenceDate, windowDays));
  const periodEnd = formatDate(referenceDate);
  const deadlines = new Map();
  for (const event of publicEvents) {
    for (const deadline of event.deadlines ?? []) {
      if (deadline.date >= referenceDate && deadline.id) {
        deadlines.set(deadline.id, { ...deadline, eventId: event.id });
      }
    }
  }
  return [
    {
      id: 'recent',
      value: recent.length,
      label: 'acontecimentos no período',
      description: `Conta uma vez cada assunto com registro publicável publicado ou movimentado entre ${periodStart} e ${periodEnd}. O número descreve esta amostra, não o total de publicações oficiais.`,
      eventIds: recent.map((event) => event.id),
    },
    {
      id: 'followed',
      value: followed.length,
      label: 'assuntos anteriores em acompanhamento',
      description:
        'Assuntos fora da janela recente com justificativa editorial de continuidade; cada assunto é contado uma vez.',
      eventIds: followed.map((event) => event.id),
    },
    {
      id: 'deadlines',
      value: deadlines.size,
      label: 'prazos oficiais futuros identificados',
      description: `Prazos oficiais a partir de ${periodEnd}, associados a acontecimentos publicáveis deste conjunto. Cada prazo é contado uma vez.`,
      eventIds: [...new Set([...deadlines.values()].map((deadline) => deadline.eventId))],
      deadlines: [...deadlines.values()],
    },
  ];
}
