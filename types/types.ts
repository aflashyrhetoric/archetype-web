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

type shared = timestamps & GlobalAttributes

export enum ProductCategory {
  TheDesk = "the desk",
  IO = "i/o",
  Tech = "tech",
  Monitors = "monitors",
  Audio = "audio",
  Decor = "decor",
}

export type MediaProductReviewAttributes = shared & {
  videoTitle: string
  url: string
}

export type BrandAttributes = shared & {
  name: string
}

export type ImageRelation = RelationSingle<StrapiImageAttributes>

export type ProductAttributes = shared & {
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

export type QuoteAttributes = shared & {
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

export type KitAttributes = shared & {
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
export type SEOAttributes = shared & {
  metaTitle: string
  metaDescription: string
  shareImage: RelationSingle<StrapiImageAttributes>
}

export type HeroAttributes = shared & {
  title: string
  hero_image: RelationSingle<StrapiImageAttributes>
}

export type AboutSectionAttributes = shared & {
  page_heading: string
  about_archetype_text: string // rich text
}

export type GlobalAttributes = {
  footer: RelationSingle<FooterAttributes>
}

export type FooterAttributes = shared & {
  browse_by_archetypes: string
  company_copy: string
  footer_heading: string
}

export type AboutPageAttributes = shared & {
  seo: RelationSingle<SEOAttributes>
  hero: RelationSingle<HeroAttributes>
  about: RelationSingle<AboutSectionAttributes>
}

// ! PageResponse Type
export type PageResponse<T> = RelationSingle<T>
export type PageProps<T> = T & shared

export type FooterResponse = PageResponse<FooterAttributes>
export type AboutResponse = PageResponse<AboutPageAttributes>
export type AboutPageProps = PageProps<AboutPageAttributes>
export type KitResponse = PageResponse<KitAttributes>
export type ProductResponse = PageResponse<ProductAttributes>
export type QuoteResponse = PageResponse<QuoteAttributes>

export type ProductCategoryMap = {
  [key in ProductCategory]: DataManyBlobInResponse<ProductAttributes>
}
