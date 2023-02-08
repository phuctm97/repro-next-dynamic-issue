import { Suspense } from "react";
import { dynamic } from "@/libs/dynamic";

import { Fallback } from "./fallback";

// Dynamically import Example component because it contains some heavy dependencies
const Component = dynamic(() => import("./component"));

export function Example() {
  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  );
}
