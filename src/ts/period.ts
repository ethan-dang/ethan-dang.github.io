// Formats employment periods LinkedIn-style ("Jan 2026 – Present · 11 mos"),
// computing the duration at page load so ongoing roles never go stale.

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface YearMonth {
  year: number;
  month: number; // 1–12
}

function parseYearMonth(value: string): YearMonth {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

function formatYearMonth({ year, month }: YearMonth): string {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ");
}

/**
 * @param start "YYYY-MM"
 * @param end   "YYYY-MM", or omitted for a role that's still ongoing
 *
 * Months are counted inclusively (both the start and current/end month count),
 * matching how LinkedIn reports durations.
 */
export function formatPeriod(start: string, end?: string, now: Date = new Date()): string {
  const from = parseYearMonth(start);
  const to = end ? parseYearMonth(end) : { year: now.getFullYear(), month: now.getMonth() + 1 };
  const totalMonths = Math.max(1, (to.year - from.year) * 12 + (to.month - from.month) + 1);
  const endLabel = end ? formatYearMonth(to) : "Present";
  return `${formatYearMonth(from)} – ${endLabel} · ${formatDuration(totalMonths)}`;
}
