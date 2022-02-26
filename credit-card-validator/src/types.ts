import { ReactNode } from "react";

export type CreditCardValidation = {
  creditCardNumbers: String[];
};

export type CreditCardInfo = {
  creditCardNumberText: string;
  formattedCreditCardNumber: string;
  isValidCreditCard: boolean;
  creditCardType: string;
};