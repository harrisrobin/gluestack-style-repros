import { useScrollToTop } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { LayoutChangeEvent, ViewStyle } from "react-native";
import { View } from "../view";
import { useSafeAreaInsetsStyle } from "./use-safe-area-insets-style";
import { ScrollView } from "../scroll-view";
import {
  AutoScreenProps,
  FixedScreenProps,
  ScrollScreenProps,
} from "./screen.props";

export type ScreenProps =
  | ScrollScreenProps
  | FixedScreenProps
  | AutoScreenProps;

function isNonScrolling(preset?: ScreenProps["variant"]) {
  return !preset || preset === "fixed";
}

function useAutoPreset(props: AutoScreenProps) {
  const { variant, scrollEnabledToggleThreshold } = props;
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {};

  const scrollViewHeight = useRef<number | null>(null);
  const scrollViewContentHeight = useRef<number | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  function updateScrollState() {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    ) {
      return;
    }

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current - point
        );
      } else {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current * percent
        );
      }
    })();

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) {
      setScrollEnabled(false);
    }

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) {
      setScrollEnabled(true);
    }
  }

  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h;
    updateScrollState();
  }

  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout;
    // update scroll-view  height
    scrollViewHeight.current = height;
    updateScrollState();
  }

  // update scroll state on every render
  if (variant === "auto") {
    updateScrollState();
  }

  return {
    scrollEnabled: variant === "auto" ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, sx, contentContainerStyle, children } = props;

  return (
    <View
      style={[$outerStyle, style]}
      sx={{
        backgroundColor: "$backgroundColorLight",
        ...sx,
      }}
    >
      <View style={[$innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    contentContainerStyle,
    ScrollViewProps,
    style,
    sx,
  } = props as ScrollScreenProps;

  const ref = useRef<any>();

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(
    props as AutoScreenProps
  );

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <ScrollView
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e);
        ScrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        ScrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[$outerStyle, ScrollViewProps?.style, style]}
      sx={{
        backgroundColor: "$backgroundColorLight",
        ...sx,
      }}
      contentContainerStyle={[
        $innerStyle,
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
}

export function Screen(props: ScreenProps) {
  const { safeAreaEdges, StatusBarProps, statusBarStyle = "dark" } = props;

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View
      style={[$containerInsets]}
      sx={{
        backgroundColor: "$backgroundColorLight",
        flex: 1,
        height: "100%",
        width: "100%",
      }}
    >
      <StatusBar style={statusBarStyle} {...StatusBarProps} />

      {isNonScrolling(props.variant) ? (
        <ScreenWithoutScrolling {...props} />
      ) : (
        <ScreenWithScrolling {...props} />
      )}
    </View>
  );
}

const $outerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
};

const $innerStyle: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "stretch",
  flex: 1,
};
