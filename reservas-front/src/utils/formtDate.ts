export function formatDateTime(
  date: string | Date | null | undefined,
  locale: string = "es-AR"
): string {
  if (!date) return "—";

  const d = date instanceof Date ? date : new Date(date);

  return d.toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}