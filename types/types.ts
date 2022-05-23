import {
  DataManyBlobInResponse,
  DataSingleBlobInResponse,
  RelationMany,
  RelationSingle,
  StrapiImageAttributes,
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

export type MediaProductReviewAttributes = timestamps & {
  videoTitle: string
  url: string
}

export type BrandAttributes = timestamps & {
  name: string
}

export type ImageRelation = RelationSingle<StrapiImageAttributes>

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
  photo: ImageRelation
  brand: RelationSingle<BrandAttributes>
  media_product_reviews: RelationMany<MediaProductReviewAttributes>
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

  thumbnail_img: ImageRelation
  stylized_name_img: ImageRelation
  archetype: RelationSingle<ArchetypeAttributes>
  products: RelationMany<ProductAttributes>
  quote: QuoteResponse
}
export type SEOAttributes = timestamps & {
  metaTitle: string
  metaDescription: string
  shareImage: RelationSingle<StrapiImageAttributes>
}

export type HeroAttributes = timestamps & {
  title: string
  hero_image: RelationSingle<StrapiImageAttributes>
}

export type AboutSectionAttributes = timestamps & {
  page_heading: string
  about_archetype_text: string // rich text
}

export type FooterAttributes = timestamps & {
  browse_by_archetypes: string
  company_copy: string
  footer_heading: string
}

export type AboutPageAttributes = timestamps & {
  seo: RelationSingle<SEOAttributes>
  hero: RelationSingle<HeroAttributes>
  about: RelationSingle<AboutSectionAttributes>
  footer: RelationSingle<FooterAttributes>
}

export type FooterResponse = RelationSingle<FooterAttributes>
export type AboutResponse = RelationSingle<AboutPageAttributes>

export type KitResponse = RelationSingle<KitAttributes>
export type ProductResponse = RelationSingle<ProductAttributes>
export type QuoteResponse = RelationSingle<QuoteAttributes>

export type ProductCategoryMap = {
  [key in ProductCategory]: DataManyBlobInResponse<ProductAttributes>
}
