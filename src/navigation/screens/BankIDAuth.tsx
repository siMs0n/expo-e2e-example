import { Button, View } from "react-native";
import { useContext } from "react";
import { envConfig } from "../../../env";
import { AuthContext } from "../../auth/AuthContext";
import utf8 from "utf8";
import { encode } from "base-64";

export function BankIDAuth() {
  const auth = useContext(AuthContext);

  const signInWithFakeTokens = () => {
    const accessToken = getFakeAccessToken();
    const refreshToken = getFakeRefreshToken();
    auth.signIn(accessToken, refreshToken);
  };

  if (envConfig.appProfile === "e2e-test") {
    return (
      <View style={{ marginTop: 100 }}>
        <Button
          testID="login_mock"
          title="Simulate BankID Login"
          onPress={signInWithFakeTokens}
        />
      </View>
    );
  }

  // Return real BankID auth flow for otherwise
  return null;
}

const getFakeAccessToken = () => {
  const fakeTokenBefore =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjlENjdGQjQ2MTBEMDI0Q0YyMTIwOTdCOEMzQ0Q5RDc2IiwidHlwIjoiand0In0.fake.ih-L8q8Zwaq6m2l2RuScJnK-LQKPLgSGW2c2lYYHLvOVGKd01tkbybqJI7ws-wfvR5lTk5VBLv7mhCnMSqQmf5vv8WO1KZeQsUyYeJLlSd2-oEi6IAjt0xiIhGmiy97BEvIjY1R5j38xwilz6qqT1dEPvzweTuLyWre1DrnkKsGOhnfGIxN7o4U_qsjWR7iY6X4BOoJOZEeq8aAxSvtrnje6MeIO3Yn-MqohUwTIVUY_ptUigDbPsZU0V8ToVq5QapfbJrT51z4cEL7i1sPv1vW4FCXDAG3tQq-XzETbO6oCa0KXpEHBlXs6cLOThkD3aAwuvRdKnaAmdOhV10aBmg";
  const minutesUntilExpiry = 10 * 60;
  const fakeTokenData = {
    sub: "1234567890",
    name: "John Doe",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + minutesUntilExpiry,
  };
  const tokenStr = JSON.stringify(fakeTokenData);
  const encodedToken = utf8.encode(encode(tokenStr));
  const fakeToken = `${fakeTokenBefore.split(".")[0]}.${encodedToken}.${fakeTokenBefore.split(".")[2]}`;

  return fakeToken;
};

const getFakeRefreshToken = () => {
  return "def50200bfbddde8e768ebadbfde0fbbacfa";
};
