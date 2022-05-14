import {
  StrapiImageAttributes,
  DataSingleBlobInResponse,
  RelationSingle,
  RelationMany,
  DataManyBlobInResponse,
} from "./strapi"

type timestamps = {
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export enum ProductCategory {
  TheDesk = "the desk",
  IO = "i/o",
  Tech = "tech",
  Monitors = "monitors",
  Audio = "audio",
  Decor = "decor",
}

export type BrandAttributes = timestamps & {
  name: string
}

export type ProductAttributes = timestamps & {
  name: string
  url: string
  affiliate_link: string
  pros: string
  cons: string
  is_alone_in_product_category: boolean
  long_description: string
  price: number
  sale_price: number
  category: ProductCategory
  photo: RelationSingle<StrapiImageAttributes>
  brand: RelationSingle<BrandAttributes>
}

export type QuoteAttributes = timestamps & {
  body: string
  author: string
}

export type ArchetypeAttributes = {
  name: string
  main_image: StrapiImageAttributes
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type KitAttributes = timestamps & {
  name: string
  slug: string

  card_summary: string
  main_description: string
  short_description: string

  thumbnail_img: RelationSingle<StrapiImageAttributes>
  stylized_name_img: RelationSingle<StrapiImageAttributes>
  archetype: RelationSingle<ArchetypeAttributes>
  products: RelationMany<ProductAttributes>
  quote: QuoteResponse
}

export type KitResponse = RelationSingle<KitAttributes>
export type ProductResponse = RelationSingle<ProductAttributes>
export type QuoteResponse = RelationSingle<QuoteAttributes>

export type ProductCategoryMap = {
  [key in ProductCategory]: DataManyBlobInResponse<ProductAttributes>
}
