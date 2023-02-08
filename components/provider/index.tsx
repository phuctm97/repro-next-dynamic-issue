import dynamic from "next/dynamic";
import { Fragment, PropsWithChildren, Suspense } from "react";

// Dynamically import Provider component because it contains some heavy dependencies
const Component = dynamic(() => import("./component"));

export * from "./context";

export function Provider(props: PropsWithChildren) {
  return (
    <Suspense fallback={<Fragment {...props} />}>
      <Component {...props} />
    </Suspense>
  );
}