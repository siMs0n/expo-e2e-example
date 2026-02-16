import React, { useContext } from "react";
import { decode } from "base-64";
import utf8 from "utf8";
import { setAuthToken } from "../api/api-client";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface Auth {
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (accessToken: string, refreshToken: string) => Promise<void>;
  signOut: () => void;
  restoreToken: (accessToken: string, refreshToken: string) => Promise<void>;
}

type AuthAction =
  | {
      type: "RESTORE_TOKEN";
      accessToken: string | null;
      refreshToken: string | null;
    }
  | {
      type: "SIGN_IN";
      accessToken: string;
      refreshToken: string;
    }
  | {
      type: "SIGN_OUT";
    };

export const AuthContext = React.createContext<Auth>({} as Auth);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(
    (prevState: AuthState, action: AuthAction) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
          };
        case "SIGN_IN":
          return {
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
          };
        case "SIGN_OUT":
          return {
            accessToken: null,
            refreshToken: null,
          };
      }
    },
    {
      accessToken: null,
      refreshToken: null,
    },
  );

  const authContext = React.useMemo(
    () => ({
      ...state,
      signIn: async (accessToken: string, refreshToken: string) => {
        setAuthToken(accessToken);
        dispatch({ type: "SIGN_IN", accessToken, refreshToken });
      },
      signOut: () => {
        console.log("signing out");
        setAuthToken(null);
        dispatch({ type: "SIGN_OUT" });
      },
      restoreToken: async (accessToken: string, refreshToken: string) => {
        setAuthToken(accessToken);
        dispatch({ type: "RESTORE_TOKEN", accessToken, refreshToken });
      },
    }),
    [state],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider };

export function useIsSignedIn() {
  const { accessToken } = useContext(AuthContext);
  const isSignedIn =
    accessToken && parseJwt(accessToken as any)?.exp * 1000 > Date.now();
  return isSignedIn || false;
}

export function useIsSignedOut() {
  const isSignedIn = useIsSignedIn();
  return !isSignedIn;
}

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const utf = utf8.decode(decode(base64));
  return JSON.parse(utf);
};
