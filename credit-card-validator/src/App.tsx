import React from 'react';
import './App.css';
import { CreditCardApi } from "../src/api/creditCardApi";
import { CreditCardInfo, CreditCardValidation } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [creditCardIds, setCreditCardIds] = React.useState<string>("");
  const [validatedCreditCards, setValidatedCreditCards] = React.useState<CreditCardInfo[]>([]);
  const [ad, setAd] = React.useState<string>("");
  const submit = () => {
    if (creditCardIds !== "" && creditCardIds.length > 0) {
      let creditCards: CreditCardValidation = {
        creditCardNumbers: creditCardIds.split(',')
      }
      CreditCardApi.validateCreditCardList(creditCards)
        .then((validatedCardList) => {
          setValidatedCreditCards(validatedCardList);
        })
        .catch((error) => {
          //handle errors
        });
    } else {
      // show error message
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Please enter credit card numbers with comma seperated</p>
          <input
            autoFocus
            id="outlined-basic"
            type="text"
            value={creditCardIds}
            onChange={(e) => setCreditCardIds(e.target.value)}
            style={{ width: "100%" }}
          />

          <button
            style={{
              width: "50%",
              marginTop: "3%",
            }}
            key={1}
            onClick={() => submit()}
          >
            Submit
          </button>

          {(validatedCreditCards != null && validatedCreditCards.length > 0) ? (
            <table className="table table-striped table-hover" style={{ textAlign: "left", marginTop: "3%" }}>
              <thead>
                <tr>
                  <th scope="col">
                    Credit Card Number
                  </th>
                  <th scope="col">
                    Credit Card Type
                  </th>
                  <th scope="col">
                    Validity
                  </th>
                </tr>
              </thead>
              <tbody>
                {validatedCreditCards.map((creditCard) => (
                  <tr key={creditCard.formattedCreditCardNumber}>
                    <td>{creditCard.creditCardNumberText}</td>
                    <td>{creditCard.creditCardType}</td>
                    <td>{creditCard.isValidCreditCard ? "Valid" : "Invalid"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<></>)}
        </div>
      </header>
    </div>
  );
}

export default App;
