export type DataSingleBlobInResponse<T> = {
  id: number
  attributes: T
}

export type RelationSingle<T> = {
  data: DataSingleBlobInResponse<T>
}

export type DataManyBlobInResponse<T> = Array<DataSingleBlobInResponse<T>>

export type RelationMany<T> = {
  data: DataManyBlobInResponse<T>
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
  url: string
  width: number
  height: number
  formats: StrapiImageFormats

  alternativeText: string
  caption: string
  previewUrl: string
  size: number
  mime: string
  ext: string
  hash: string
}
