import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://apie2e.example.com/api/v1/account", () => {
    if (!mockAccountService.getAccount()) {
      return HttpResponse.text("", { status: 404 });
    }
    return HttpResponse.json(mockAccountService.getAccount());
  }),
  http.post(
    "https://apie2e.example.com/api/v1/account",
    async ({ request }) => {
      const body = await request.clone().json();
      mockAccountService.setAccount({ ...(body as object), name: "Simon" });
      return HttpResponse.json(mockAccountService.getAccount());
    },
  ),
  http.put("https://apie2e.example.com/api/v1/account", async ({ request }) => {
    const body = await request.clone().json();
    mockAccountService.updateAccount(body);
    return HttpResponse.json(mockAccountService.getAccount());
  }),
  http.get("http://localhost:4000/e2e-testing/reset", async () => {
    mockAccountService.reset();
    return HttpResponse.json({ message: "OK" });
  }),
  http.get("http://localhost:4000/e2e-testing/new-user", async () => {
    mockAccountService.setUserNotRegistered();
    return HttpResponse.json({ message: "OK" });
  }),
];

const defaultAccount = {
  name: "Simon",
  phoneNumber: "12345678",
  termsAccepted: true,
};

class MockAccountService {
  private account = this.simpleDeepClone(defaultAccount);
  getAccount() {
    return this.account;
  }
  setAccount(account: any) {
    this.account = account;
  }
  updateAccount(updatedAccount: any) {
    this.account = {
      ...this.account,
      ...updatedAccount,
    };
  }
  setUserNotRegistered() {
    this.account = null;
  }
  reset() {
    this.account = this.simpleDeepClone(defaultAccount);
  }
  private simpleDeepClone(obj: unknown) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export const mockAccountService = new MockAccountService();
