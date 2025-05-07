import { devtools } from "zustand/middleware";

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const devtoolsWrap = (fn, name?: string) =>
  isDev ? devtools(fn, { name }) : fn;
