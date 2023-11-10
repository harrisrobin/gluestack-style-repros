import { TextProps as TextProperties, TextStyle } from "react-native"
import { TxKeyPath } from "../../services/i18n"

type TextVariants = "body"
type TextSizes = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: Record<string, unknown>

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | null

  /**
   * Optional theme UI variant to use
   */
  variant?: TextVariants

  size?: TextSizes
}
