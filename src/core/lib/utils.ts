import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundDecimal(value: number, precision: number = 2) {
  return (
    Math.round((value + Number.EPSILON) * 10 ** precision) / 10 ** precision
  );
}

export function formatCurrency(
  amount?: number,
  currency?: string,
  locale?: string,
  precision?: number
) {
  if (amount === null || amount === undefined || Number.isNaN(amount as number))
    return '';

  currency = currency || localStorage.getItem('currency') || 'USD';
  const resolvedLocale = locale || 'en-US';

  return new Intl.NumberFormat(resolvedLocale, {
    style: 'currency',
    currency,
    currencySign: 'accounting',
    minimumFractionDigits: typeof precision === 'number' ? precision : 2,
  }).format(amount);
}

export function addDays(date: Date | string | undefined, days: number) {
  if (!date) return undefined;
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
}

export function toPascalCase(str: string) {
  if (!str) return '';
  return str
    .replace(/_/g, ' ')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
