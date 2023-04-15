export const formatCurrency = (num: number): string => {
  return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }).replace('VND', '₫')
}
