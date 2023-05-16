import AppBanner from "@/components/AppBanner.js";
import { AppBannerContext } from "@/components/contexts/AppBannerContext";
import { AuthProvider } from "@/components/contexts/AuthContext";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [value, setValue] = useState("");

  return (
    <>
      <AuthProvider>
        <AppBannerContext.Provider value={{ value, setValue }}>
          <AppBanner />
          <Component {...pageProps} />
        </AppBannerContext.Provider>
      </AuthProvider>
    </>
  );
}
