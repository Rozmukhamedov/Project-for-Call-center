import { FC } from "react";
import { useLang } from "./Metronici18n";
import { IntlProvider } from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/ru";
import "@formatjs/intl-relativetimeformat/locale-data/uz";

import enMessages from "./messages/en.json";
import ruMessages from "./messages/ru.json";
import uzMessages from "./messages/uz.json";
import { WithChildren } from "../helpers";

const allMessages = {
  en: enMessages,
  ru: ruMessages,
  uz: uzMessages,
};

const I18nProvider: FC<WithChildren> = ({ children }) => {
  const locale = useLang();
  const messages = allMessages[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export { I18nProvider };
