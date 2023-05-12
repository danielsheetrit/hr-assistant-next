import "@/styles/globals.css";
// theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
// core
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { AuthProvider } from "@/contexts/jwt-context";

// redux
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "../redux/store";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
      </ReduxProvider>
    </AuthProvider>
  );
}
