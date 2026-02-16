import wretch from "wretch";
import { envConfig } from "../../env";

let authToken: null | string = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const apiClient = wretch(`https://${envConfig.backendUrl}/api/v1`)
  .headers({
    "Content-Type": "application/json",
  })
  .middlewares([
    (next) => (url, opts) => {
      if (authToken) {
        opts.headers = {
          ...opts.headers,
          Authorization: `Bearer ${authToken}`,
        };
      }

      return next(url, opts);
    },
  ]);

export default apiClient;
