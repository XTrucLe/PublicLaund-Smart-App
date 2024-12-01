export const formatMoney = (money: number) => {
  return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};
