import { appSettings } from "../appSettings";
import {
  CreditCardValidation,
  CreditCardInfo
} from "../types";
import { doRequest } from "../services/api";

const apiUrl = `${appSettings.CreditCardApiBaseUrl}`;

export const CreditCardApi = {
  validateCreditCardList(validationRequestModel: CreditCardValidation): Promise<CreditCardInfo[]> {
    return doRequest(
      "POST",
      // `${apiUrl}/CreditCards/Validate`,
      `https://localhost:7163/api/v1/CreditCards/Validate`,
      validationRequestModel
    );
  },
};