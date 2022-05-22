import ColorThief from "../node_modules/colorthief/dist/color-thief.mjs"
// import ColorThief from "color-thief"
import FastAverageColor, { FastAverageColorResult } from "fast-average-color"
import { ImageRelation } from "../types/types"
import { getStrapiURL } from "./api"

interface FastAverageColorType {
  hex: string
  hexa: string
  isDark: boolean
  isLight: boolean
  rgb: string
  rgba: string
}

async function loadImage(imgSrc) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.src = imgSrc
    img.crossOrigin = "anonymous"

    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imgSrc

    return img
  })
}

export const rgbToHex = ([r, g, b]: number[]) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

export const getColors = async (imgSrc: string) => {
  const img = await loadImage(imgSrc)
  const ct = new ColorThief()
  const palette = ct.getPalette(img)
  return [...palette, ...palette.reverse()].map((rgbColor) => {
    // convert to string
    const [r, g, b] = rgbColor
    return `rgba(${r}, ${g}, ${b}, 0.6)`
  })
  // const paletteArrayOfHexValues = palette.map(rgbToHex)
  // console.log(paletteArrayOfHexValues)
  // return paletteArrayOfHexValues
}

export const imgSrcToLinearGradientString = async (imgSrc: string) => {
  const palette = await getColors(imgSrc)
  const angle = "90"
  console.log(palette)
  return `linear-gradient(${angle}deg, ${palette.join(", ")})`
}

export const getColor = async (
  photo: ImageRelation
): Promise<FastAverageColorResult> => {
  const url = getStrapiMedia(photo)
  const color = await new FastAverageColor().getColorAsync(url)
  return color
}

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
