import type { FC } from "react";
import type { Loader } from "next/dynamic";

import { useContext } from "react";
import nextDynamic from "next/dynamic";

import { Context } from "@/components/provider";

// Wrap next/dynamic to wait for both dynamic import & Context to be ready
// [BUG] This has 2 bugs:
// 1. Throw Error during SSR should NOT be considered an error, it's how to suspend a component during SSR. However, Next.js is showing error both in console & in Next.js error overlay.
//    this issue has been reported before https://github.com/vercel/next.js/issues/35564 but it happens again now.
// 2. The next/dynamic returned component doesn't seem to be rendered immediately instead something is being rendered first which cause
//    any wrapping <Suspense /> to fail to maintain its fallback state & cause flashing effects. Run the example you'll see the flashing effect, it should NOT happen.
//    This issue doesn't happen in next@13.0.6.
export function dynamic<P extends JSX.IntrinsicAttributes>(
  loader: Loader<P>
): React.ComponentType<P> {
  const NextDynamicComponent = nextDynamic(loader, { suspense: true });
  const CustomDynamicComponent: FC<P> = (props) => {
    if (typeof window === "undefined") throw new Error(); // Suspend the component during SSR
    const context = useContext(Context);
    if (!context)
      // Suspense the component until Context is ready
      throw new Promise((resolve) => window.setTimeout(resolve, 200));
    return <NextDynamicComponent {...props} />;
  };
  return CustomDynamicComponent;
}

// I have looked into changes since 13.0.7 and it seems like LazyImpl was completely replaced by LoadableImpl which is causing both issues.