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

interface ApiError {
  status: number;
  message: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Response) {
    return {
      status: error.status,
      message: error.statusText || "Something went wrong",
    };
  }

  return {
    status: 0,
    message: (error as Error).message || "Unknown error",
  };
};

export default apiClient;
