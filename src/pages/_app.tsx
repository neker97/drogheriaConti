import { AppProps } from "next/app";

import { LanguageProvider } from "../utils/LanguageContext"; // importa quello che hai appena fatto

import "../styles/main.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <LanguageProvider>
    <Component {...pageProps} />
  </LanguageProvider>
);

export default MyApp;
