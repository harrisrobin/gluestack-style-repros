import {
  StyledProvider,
  Theme as GluestackTheme,
} from "@gluestack-style/react";
import { useColorScheme } from "react-native";
import { config as gluestackConfig } from "../../theme/gluestack-style.config";
import type { COLORMODES } from "@gluestack-style/react/lib/typescript/types";

interface GluestackProviderProps {
  children: React.ReactNode;
}
const GluestackProvider = (props: GluestackProviderProps) => {
  const colorScheme = useColorScheme();

  return (
    <StyledProvider
      config={gluestackConfig}
      colorMode={colorScheme as COLORMODES}
    >
      <GluestackTheme
        name="default"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {props.children}
      </GluestackTheme>
    </StyledProvider>
  );
};
export { GluestackProvider };
