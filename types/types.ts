import {
  StrapiImageAttributes,
  DataSingleBlobInResponse,
  RelationSingle,
  RelationMany,
} from "./strapi"

type timestamps = {
  createdAt: string
  updatedAt: string
  publishedAt: string
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
}

export type QuoteAttributes = timestamps & {
  body: string
  author: string
}

export type ArchetypeAttributes = {
  name: string
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

export type KitResponse = DataSingleBlobInResponse<KitAttributes>
export type ProductResponse = RelationSingle<ProductAttributes>
export type QuoteResponse = RelationSingle<QuoteAttributes>
