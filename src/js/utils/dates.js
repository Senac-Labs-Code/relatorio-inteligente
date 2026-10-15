export function parseCalendarDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day)
    return null;
  return date;
}

export function isWithinWindow(dateValue, referenceValue, windowDays = 30) {
  const date = parseCalendarDate(dateValue);
  const reference = parseCalendarDate(referenceValue);
  if (!date || !reference || !Number.isInteger(windowDays) || windowDays < 1) return false;
  const ageDays = (reference.getTime() - date.getTime()) / 86_400_000;
  return ageDays >= 0 && ageDays < windowDays;
}

export function getWindowStart(referenceValue, windowDays = 30) {
  const reference = parseCalendarDate(referenceValue);
  if (!reference || !Number.isInteger(windowDays) || windowDays < 1) return null;
  reference.setUTCDate(reference.getUTCDate() - windowDays + 1);
  return reference.toISOString().slice(0, 10);
}

export function formatDate(
  value,
  options = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
) {
  const date = parseCalendarDate(value);
  if (!date) return 'Data não informada';
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export function getLatestEventDate(event) {
  return [event.publicationDate, event.lastMovementDate].filter(Boolean).sort().at(-1) ?? null;
}
