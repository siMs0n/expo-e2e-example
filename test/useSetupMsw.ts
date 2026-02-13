import { useEffect, useState } from "react";
import { envConfig } from "../env";

export const useSetupMsw = () => {
  const [mswReady, setMswReady] = useState(envConfig.appProfile !== "e2e-test");

  useEffect(() => {
    async function enableMocking() {
      if (envConfig.appProfile !== "e2e-test") {
        return;
      }

      await import("../msw.polyfills");

      const { server } = await import("./msw-server");

      server.listen();

      setMswReady(true);
      console.log("MSW enabled");
    }
    enableMocking();
  }, []);

  return mswReady;
};
