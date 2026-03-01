import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "@/context/GlobalContext";
import { AppErrorBoundary } from "@dasjideepak/mf-shared-ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <AppErrorBoundary>
        <Component {...pageProps} />
      </AppErrorBoundary>
    </GlobalProvider>
  );
}
