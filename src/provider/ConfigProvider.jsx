import React from "react";
import { defaultLocale } from "../locale";

const ConfigContext = React.createContext();

const ConfigProvider = ({ locale = defaultLocale, children, ...args }) => (
  <ConfigContext.Provider value={{ locale, ...args }}>{children}</ConfigContext.Provider>
);

ConfigProvider.context = ConfigContext;
export default ConfigProvider;
