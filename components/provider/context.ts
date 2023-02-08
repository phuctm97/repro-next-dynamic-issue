import { createContext } from "react";

// Example context whose value will be provided dynamically/asynchronously in Provider component (see ./index.tsx)
export const Context = createContext<object | undefined>(undefined);