import * as icons from "lucide-react-native"
import { useToken } from "@gluestack-style/react"
import { StyledTextProps } from "@/components/text"
export type IconTypes = keyof Omit<typeof icons, "createReactComponent">

interface IconProps {
  icon: IconTypes
  color?: string
  colorToken?: StyledTextProps["color"]
  size?: number
}
const Icon = (props: IconProps) => {
  const { icon, color, colorToken = "$slate12", size = 24 } = props
  const LucideIcon = icons[icon]
  const resolvedColor = useToken("colors", colorToken.replace("$", ""))

  // @ts-ignore
  return <LucideIcon color={color ? color : resolvedColor} size={size} />
}

export { Icon }
