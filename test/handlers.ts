import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://e2e.simoncnielsen.com/api/v1/account", () => {
    return HttpResponse.json({ name: "Simon" });
  }),
];
