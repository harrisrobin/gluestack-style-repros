import * as Haptics from "expo-haptics"

const impactAsync = (
  feedback: keyof typeof Haptics.ImpactFeedbackStyle = "Medium",
): Promise<void> => {
  if (__DEV__) return Promise.resolve()
  return Haptics.impactAsync(Haptics.ImpactFeedbackStyle[feedback])
}

const notificationAsync = (
  feedback: keyof typeof Haptics.NotificationFeedbackType,
): Promise<void> => {
  if (__DEV__) return Promise.resolve()
  return Haptics.notificationAsync(Haptics.NotificationFeedbackType[feedback])
}

const selectionAsync = (): Promise<void> => {
  if (__DEV__) return Promise.resolve()
  return Haptics.selectionAsync()
}

export const haptics = {
  impactAsync,
  notificationAsync,
  selectionAsync,
}
