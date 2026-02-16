import { apiClient } from "./api-client";

export type UserAccount = {
  name: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  termsAccepted: boolean;
};

export class NotFoundError extends Error {
  constructor(message: string = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export const fetchUserAccount = async (): Promise<UserAccount> => {
  try {
    const data = await apiClient.get("/account").json<UserAccount>();
    return data;
  } catch (error) {
    if ((error as any)?.status === 404) {
      throw new NotFoundError("User account not found");
    }
    throw error;
  }
};

export const createUserAccount = async (account: {
  phoneNumber: string;
  termsAccepted: boolean;
}): Promise<UserAccount> => {
  const data = await apiClient
    .post(
      {
        phoneNumber: account.phoneNumber,
        termsAccepted: account.termsAccepted,
      },
      "/account",
    )
    .json<UserAccount>();
  return data;
};

export const requestPhoneVerification = async (): Promise<void> => {
  await apiClient.post({}, "/account/validatephone/request").text();
};

export const verifyPhoneCode = async (code: string): Promise<void> => {
  await apiClient.post({ code }, "/account/validatephone/verify").text();
};
