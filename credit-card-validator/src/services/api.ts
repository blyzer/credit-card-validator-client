type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type RequestError = {
  errorBody: any | { errorMessage: string };
  statusCode: number;
};
export const isRequestError = (err: any): err is RequestError =>
  err != null &&
  typeof err === "object" &&
  "errorBody" in err &&
  "statusCode" in err;

export const extractErrorMessage = (err: any): string | null => {
  if (typeof err === "string") return err;
  if (isRequestError(err) === false) return null;
  else {
    if (
      err.errorBody != null &&
      typeof err.errorBody === "object" &&
      "errorMessage" in err.errorBody
    )
      return err.errorBody.errorMessage;
    else return null;
  }
};

export function doRequest<T = any>(
  httpMethod: HttpMethod,
  url: string,
  body?: object,
  returnBlob?: boolean
): Promise<T> {
  return fetch(url, {
    method: httpMethod,
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then((response) => {
      if (response.ok) {
        if (response.body != null) {
          if (returnBlob) {
            return response
              .blob()
              .catch(() => Promise.reject("Error parsing body"));
          }
          return response
            .text()
            .then((txt) => (txt.length ? JSON.parse(txt) : {}))
            .catch((error) => Promise.reject("Error parsing body"));
        } else return null;
      } else {
        if (response.status === 400)
          return Promise.reject("Bad Request 400");
        if (response.status === 401)
          return Promise.reject("Forbidden 401");
        else if (response.status === 403)
          return Promise.reject("Forbidden 403");
        else if (response.status === 404)
          return Promise.reject("Not Found 404");
        else if (response.status === 500) {
          return Promise.reject("Internal Server Error 500");
        }
        else if (response.status === 501) {
          return Promise.reject("Not Implemented 501");
        }
        else if (response.status === 501) {
          return Promise.reject("Not Implemented 501");
        }
        else
          return response.text().then((txt) => {
            if (txt.length) {
              try {
                const json = JSON.parse(txt);
                const error: RequestError = {
                  errorBody: json,
                  statusCode: response.status,
                };
                return Promise.reject(error);
              } catch {
                const error: RequestError = {
                  errorBody: { errorMessage: `${txt}` },
                  statusCode: response.status,
                };
                return Promise.reject(new Error(error.errorBody.errorMessage));
              }
            } else {
              // For example: wrong endpoint
              return Promise.reject({
                errorBody: {
                  errorMessage: `${response.status}:  ${response.statusText}`,
                },
                statusCode: response.status,
              } as RequestError);
            }
          });
      }
    })
    .catch(err =>
      Promise.reject(new Error('Fetch failed loading: ' + url + ' - ' + err))
    );
}
