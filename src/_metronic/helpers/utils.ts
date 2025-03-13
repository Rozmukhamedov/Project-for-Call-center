export const filterNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxLength: number = 0
) => {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, maxLength);
};

export const formatNumber = (num?: number): string => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || "";
};
