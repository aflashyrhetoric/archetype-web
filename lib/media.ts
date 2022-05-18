import { ImageRelation } from "../types/types"
import { getStrapiURL } from "./api"

export function getStrapiMedia(media) {
  const { url } = media.data.attributes
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  return imageUrl
}

export enum AspectRatio {
  Landscape = "landscape",
  Portrait = "portrait",
}

export const getAspectRatio = (photo: ImageRelation) => {
  const { width, height } = photo.data.attributes
  return width > height ? AspectRatio.Landscape : AspectRatio.Portrait
}
