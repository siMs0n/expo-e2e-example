import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://apie2e.example.com/v1/account", () => {
    if (!mockAccountService.getAccount()) {
      return HttpResponse.text("", { status: 404 });
    }
    return HttpResponse.json(mockAccountService.getAccount());
  }),
  http.post("https://apie2e.example.com/v1/account", async ({ request }) => {
    const body = await request.clone().json();
    mockAccountService.setAccount({ ...(body as object), name: "Simon" });
    return HttpResponse.json(mockAccountService.getAccount());
  }),
  http.put("https://apie2e.example.com/v1/account", async ({ request }) => {
    const body = await request.clone().json();
    mockAccountService.updateAccount(body);
    return HttpResponse.json(mockAccountService.getAccount());
  }),
  http.post(
    "https://apie2e.example.com/v1/account/validatephone/request",
    () => {
      return HttpResponse.text("", { status: 200 });
    },
  ),
  http.post(
    "https://apie2e.example.com/v1/account/validatephone/verify",
    async ({ request }) => {
      const body: { code?: string } = (await request.json()) as {
        code?: string;
      };
      // Check if the code is the one used in the test.
      if (body.code === "123456") {
        mockAccountService.updateAccount({ phoneNumberVerified: true });
        return HttpResponse.text("", { status: 200 });
      }
      // Respond with an error for any other code.
      return HttpResponse.text("", { status: 422 });
    },
  ),
  http.get("http://localhost:4000/e2e-testing/reset", async () => {
    mockAccountService.reset();
    return HttpResponse.json({ message: "OK" });
  }),
  http.get("http://localhost:4000/e2e-testing/new-user", async () => {
    mockAccountService.setUserNotRegistered();
    return HttpResponse.json({ message: "OK" });
  }),
  http.get(
    "http://localhost:4000/e2e-testing/set-phone-unverified",
    async () => {
      mockAccountService.setPhoneUnverified();
      return HttpResponse.json({ message: "OK" });
    },
  ),
];

const defaultAccount = {
  name: "Simon",
  phoneNumber: "12345678",
  phoneNumberVerified: true,
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
    if (
      updatedAccount.phoneNumber &&
      updatedAccount.phoneNumber !== this.account?.phoneNumber
    ) {
      // If the phone number is updated, we reset the verification status
      updatedAccount.phoneNumberVerified = false;
    }
    this.account = {
      ...this.account,
      ...updatedAccount,
    };
  }
  setUserNotRegistered() {
    this.account = null;
  }
  setPhoneUnverified() {
    if (this.account) {
      this.account.phoneNumberVerified = false;
    }
  }
  reset() {
    this.account = this.simpleDeepClone(defaultAccount);
  }
  private simpleDeepClone(obj: unknown) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export const mockAccountService = new MockAccountService();
