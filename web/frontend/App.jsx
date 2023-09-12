import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import { SelectedOptionProvider } from "./context/SelectedOptionContext";
import Routes from "./Routes";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <AuthProvider>
              <SelectedOptionProvider>
                <NavigationMenu
                  navigationLinks={[
                    {
                      label: t("NavigationMenu.pageName"),
                      destination: "/pagename",
                    },
                  ]}
                />
                <Routes pages={pages} />
              </SelectedOptionProvider>
            </AuthProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
