import { apiClient, handleApiError } from "./api-client";

type UserAccount = {
  name: string;
};

export const fetchUserAccount = async (): Promise<UserAccount> => {
  try {
    const data = await apiClient.get("/account").json<UserAccount>();
    return data;
  } catch (err) {
    const { message } = handleApiError(err);
    throw new Error(message);
  }
};
