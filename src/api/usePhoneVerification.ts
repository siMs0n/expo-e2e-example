import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPhoneVerification, verifyPhoneCode } from "./user-api";

export const useRequestPhoneVerification = () => {
  return useMutation({
    mutationFn: requestPhoneVerification,
  });
};

export const useVerifyPhoneCode = () => {
  return useMutation({
    mutationFn: (code: string) => verifyPhoneCode(code),
  });
};
