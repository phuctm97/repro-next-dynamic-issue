import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export function Fallback() {
  // Count number of seconds since the current fallback has been rendered, to demonstrate if the fallback is unmounted/re-mounted
  // [BUG] During immediate suspenses, the fallback should NOT be unmounted/re-mounted & therefore maintain its state,
  // but it's not the case since next@v13.0.7, it works in next@13.0.6.
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(
      () => setSeconds((seconds) => seconds + 1),
      1000
    );
    return () => window.clearInterval(interval);
  }, [setSeconds]);
  return (
    <div className={`${styles.center} ${styles.description}`}>
      <p>Loading… ({seconds}s)</p>
    </div>
  );
}
