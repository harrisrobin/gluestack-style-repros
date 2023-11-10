import { ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { SxProps } from "../view";
import { ExtendedEdge } from "./use-safe-area-insets-style";
import { StatusBarProps } from "expo-status-bar";

interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  sx?: SxProps<ViewStyle>;

  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: "light" | "dark" | "auto";
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  StatusBarProps?: StatusBarProps;
}

export interface FixedScreenProps extends BaseScreenProps {
  variant?: "fixed";
}
export interface ScrollScreenProps extends BaseScreenProps {
  variant?: "scroll" | "auto";
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  ScrollViewProps?: ScrollViewProps;
}

export interface AutoScreenProps extends Omit<ScrollScreenProps, "preset"> {
  variant?: "auto";
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number };
}
