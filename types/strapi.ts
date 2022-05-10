export type DataSingleBlobInResponse<T> = {
  id: number
  attributes: T
}

export type RelationSingle<T> = {
  data: DataSingleBlobInResponse<T>
}
export type RelationMany<T> = {
  data: Array<DataSingleBlobInResponse<T>>
}

export type StrapiImageFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  url: string
}
export type StrapiImageFormats = {
  thumbnail: StrapiImageFormat
  large: StrapiImageFormat
  medium: StrapiImageFormat
  small: StrapiImageFormat
}

export type StrapiImageAttributes = {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: StrapiImageFormats
}
