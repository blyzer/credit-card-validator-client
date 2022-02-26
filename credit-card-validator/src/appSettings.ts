export const getSetting = (key: string): string => {
  const value: string | null = process.env[key] || null;
  if (value === null) console.error("Missing config key", key);
  return value || "";
};

export const appSettings = {
  CreditCardApiBaseUrl: getSetting("REACT_APP_CREDIT_CARD_API_BASE_URL")
};
