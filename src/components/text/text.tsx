import React from "react";
import { Text as RNText } from "react-native";
import { styled } from "@gluestack-style/react";
import { TextProps } from "./text.props";
import { translate } from "../../services/i18n";

const StyledText = styled(RNText, {});

// const StyledText = styled(
//   RNText,
//   {
//     variants: {
//       size: {
//         1: {
//           fontSize: 12,
//           lineHeight: 16,
//         },
//         2: {
//           fontSize: 14,
//           lineHeight: 20,
//         },
//         3: {
//           fontSize: 16,
//           lineHeight: 24,
//         },
//         4: {
//           fontSize: 18,
//           lineHeight: 26,
//         },
//         5: {
//           fontSize: 20,
//           lineHeight: 28,
//         },
//         6: {
//           fontSize: 24,
//           lineHeight: 30,
//         },
//         7: {
//           fontSize: 28,
//           lineHeight: 36,
//         },
//         8: {
//           fontSize: 35,
//           lineHeight: 40,
//         },
//         9: {
//           fontSize: 60,
//           lineHeight: 60,
//         },
//       },
//     },
//   },
//   {
//     componentName: "Text",
//   } as const
// );

export type StyledTextProps = React.ComponentProps<typeof StyledText>;

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps & StyledTextProps): JSX.Element {
  // grab the props
  const {
    tx,
    text,
    children,
    txOptions,
    // color,
    // fontWeight,
    // letterSpacing,
    // sx = { color, fontWeight, letterSpacing },
    // size = "3",
    ...rest
  } = props;

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions);
  const content = text || i18nText || children;

  return (
    <StyledText
    // size={size}
    // sx={sx ? { color, fontWeight, letterSpacing, ...sx } : sx}
    // {...rest}
    >
      {content}
    </StyledText>
  );
}
