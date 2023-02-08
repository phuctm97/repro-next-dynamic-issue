import { PropsWithChildren, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

import { Context } from "./context";

export default function Component({ children }: PropsWithChildren) {
  const [context, setContext] = useState<object>();
  useEffect(() => {
    // Provide an example context after 5 seconds, mimicking some async operations in real-world
    const timeout = window.setTimeout(() => setContext({}), 5000);
    return () => window.clearTimeout(timeout);
  }, [setContext]);
  return (
    <Context.Provider value={context}>
      {/* Example heavy dependencies */}
      <RecoilRoot>{children}</RecoilRoot>
    </Context.Provider>
  );
}
