import { useEffect, useState } from "react";
import {
  MenuComponent,
  ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent,
} from "../assets/ts/components";
import { ThemeModeComponent } from "../assets/ts/layout";

import { useLayout } from "./core";

export function MasterInit() {
  const { config } = useLayout();
  const [initialized, setInitialized] = useState(false);
  const pluginsInitialization = () => {
    ThemeModeComponent.init();
    setTimeout(() => {
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
    }, 500);
  };

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      pluginsInitialization();
    }
  }, [config, initialized]);

  return <></>;
}
