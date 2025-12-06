export function formatDateBr(value?: string | Date | null): string {
  if (!value) return ""; // sem data retorna vazio

  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return ""; // inválida

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date).replace(",", "");
}