export function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = days[date.getDay()];

  return `${month} ${day}, ${dayOfWeek}`;
}

export const totalPrices = (price1: string, price2: string): string => {
  const num1 = parseFloat(price1.replace(/[^0-9.]/g, ""));
  const num2 = parseFloat(price2.replace(/[^0-9.]/g, ""));
  const total = num1 + num2;
  const currencySymbol = price1.trim().charAt(0);
  return `${currencySymbol}${total.toFixed(2).replace(/\.00$/, "")}`;
};
