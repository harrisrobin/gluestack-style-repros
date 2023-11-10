import { createConfig } from "@gluestack-style/react";
import { fontSizes, lineHeights, radii, space } from "./theme.config";
import { colors } from "./colors";

export const config = createConfig({
  aliases: {
    bgColor: "backgroundColor",
  },
  tokens: {
    colors: colors,
    space: space,
    radii: radii,
    lineHeights: lineHeights,
    fontWeights: {
      normal: "400",
      medium: "500",
      bold: "700",
    },
    fontSizes: fontSizes,
    mediaQueries: {
      sm: "@media (min-width: 480px)",
      md: "@media (min-width: 768px)",
    },
  },
  themes: {
    default: {},
  },
} as const);

type ConfigType = typeof config;

declare module "@gluestack-style/react" {
  interface ICustomConfig extends ConfigType {}
}
