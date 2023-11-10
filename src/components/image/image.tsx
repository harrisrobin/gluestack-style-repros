import { styled } from "@gluestack-style/react"
import { Image as ExImage } from "expo-image"

export const Image = styled(ExImage, {})

export type StyledImageProps = React.ComponentProps<typeof Image>
