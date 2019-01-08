export function formatCurrency(amountToFormat) {
  return amountToFormat.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
