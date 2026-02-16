import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://apie2e.example.com/api/v1/account", () => {
    return HttpResponse.json({ name: "Simon" });
  }),
];
