export const formatCurrency = (value) =>
  new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);

export const daysIndonesia = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export function setDayIndex(day) {
  switch (day) {
    case "Senin":
      return 0;
    case "Selasa":
      return 1;
    case "Rabu":
      return 2;
    case "Kamis":
      return 3;
    case "Jumat":
      return 4;
    case "Sabtu":
      return 5;
    case "Minggu":
      return 6;
    default:
      break;
  }
}
