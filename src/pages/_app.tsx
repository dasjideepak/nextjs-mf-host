import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { GlobalProvider } from "@/context/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </GlobalProvider>
  );
}
