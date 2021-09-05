import React from "react";

export const genericContextBuilder = <T>(reactHook: () => T) =>
  React.createContext<T>(null as any);
