import styles from "@/styles/Home.module.css";

import Image from "next/image";
import { atom, useRecoilValue } from "recoil";

const componentAtom = atom<void>({
  key: "component",
  default: new Promise((resolve) => setTimeout(resolve, 5000)), // Mimic some async operations in real-world
});

export default function Component() {
  // This will IMMEDIATELY suspend the component for 5 seconds when it's rendered for the first time,
  // (Recoil is being used just to demonstrate the issue happen when this component is being suspended, any other Suspense-enabled hook would cause the same issue)
  useRecoilValue(componentAtom);
  return (
    <div className={styles.center}>
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <div className={styles.thirteen}>
        <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
      </div>
    </div>
  );
}
