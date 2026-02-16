import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestPhoneVerification, verifyPhoneCode } from "./user-api";

export const useRequestPhoneVerification = () => {
  return useMutation({
    mutationFn: requestPhoneVerification,
  });
};

export const useVerifyPhoneCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => verifyPhoneCode(code),
    onSuccess: () => {
      // Invalidate and refetch user account data
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};
