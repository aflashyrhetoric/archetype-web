import { AspectRatio, getAspectRatio } from "../../lib/media"
import {
  DataManyBlobInResponse,
  DataSingleBlobInResponse,
} from "../../types/strapi"
import {
  KitAttributes,
  KitResponse,
  ProductAttributes,
  ProductCategoryMap,
  ProductResponse,
} from "../../types/types"
import React, { useState, useRef } from "react"

import Layout from "../../components/layout"
import NextImage from "../../components/image"
import ProductCardLandscape from "../../components/product-card-landscape"
import ProductCardPortrait from "../../components/product-card-portrait"
import ReactMarkdown from "react-markdown"
import Seo from "../../components/seo"
import { fetchAPI } from "../../lib/api"

interface Props {
  kit: DataSingleBlobInResponse<KitAttributes>
  products: DataManyBlobInResponse<ProductAttributes>
}

const KitPage = ({ kit, products }: Props) => {
  const topOfProducts = useRef(null)
  const executeScroll = () =>
    topOfProducts.current.scrollIntoView({ behavior: "smooth" })

  const { attributes } = kit
  const {
    archetype,
    quote,
    main_description,
    short_description,
    name,
    thumbnail_img,
  } = attributes
  const { body, author } = quote.data.attributes

  const seo = {
    metaTitle: name,
    metaDescription: short_description,
    shareImage: thumbnail_img,
    kit: true,
  }

  const categories = Array.from(
    new Set(products?.map((product) => product.attributes.category))
  )

  const [activeCategory, setActiveCategory] = useState(categories[0])

  const categoryToProductMap = categories.reduce(
    (acc, curr) => ({
      ...acc,
      [curr]: products.filter(
        (product) => product.attributes.category === curr
      ),
    }),
    {}
  ) as ProductCategoryMap

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <div className="uk-section uk-section-small uk-background-cover uk-background-secondary uk-light">
        <div className="uk-container uk-container-small">
          <span uk-icon="icon: check"></span>
          <p className="uk-text-center uk-text-large">{short_description}</p>
        </div>
        <hr className="uk-divider-icon"></hr>
        <h3 className="uk-text-center uk-text-bold">Select Category</h3>
        <div className="ko-sticky">
          <div className="uk-flex uk-flex-center">
            {categories.map((category) => (
              <a
                key={category}
                className={
                  activeCategory === category
                    ? "uk-button uk-button-large uk-button-secondary uk-active"
                    : "uk-button uk-button-large uk-button-secondary"
                }
                onClick={() => {
                  setActiveCategory(category)
                  executeScroll()
                }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
        <div className="ko-sticky-ref" ref={topOfProducts}></div>
        {categoryToProductMap[activeCategory].map((product) => {
          return getAspectRatio(product.attributes.photo) ===
            AspectRatio.Landscape ? (
            <ProductCardLandscape key={product.id} product={product} />
          ) : (
            <ProductCardPortrait key={product.id} product={product} />
          )
        })}
      </div>
      <section className="uk-section uk-section-xsmall uk-background-secondary">
        <div className="uk-container uk-flex uk-flex-column uk-flex-center uk-child-width-1-1 uk-container-medium">
          <section className="uk-background-secondary uk-child-width-1-2@m uk-flex-center">
            <div className="kitDescription uk-container uk-margin-large-bottom">
              <h1 className="uk-text-bold uk-light uk-text-center">{name}</h1>
              <h3 className="uk-light uk-text-center uk-margin-bottom">
                A curated kit for{" "}
                <span className="heroHighlight uk-light">
                  {archetype.data.attributes.name}s
                </span>
              </h3>
              <hr className="uk-divider-icon"></hr>
              <p className="uk-text-center uk-text-default uk-text-italic">
                &quot;{body}&quot; - {author}
              </p>
              <hr className="uk-divider-icon"></hr>
              <ReactMarkdown>{main_description}</ReactMarkdown>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  const kitsRes = await fetchAPI("/kits", { fields: ["slug"] })

  return {
    paths: kitsRes.data.map((kit) => ({
      params: {
        slug: kit.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const kitsRes: KitResponse = await fetchAPI("/kits", {
    filters: {
      slug: params.slug,
    },
    populate: {
      thumbnail_img: {
        populate: "*",
      },
      products: {
        populate: {
          photo: {
            populate: "*",
          },
          media_product_reviews: {
            populate: "*",
          },
          brand: {
            populate: "*",
          },
        },
      },
      quote: {
        populate: "*",
      },
      archetype: {
        populate: "*",
      },
    },
  })

  const x = kitsRes.data[0].attributes
  console.log(JSON.stringify(x, null, 2))

  return {
    props: {
      kit: kitsRes.data[0],
      products: kitsRes.data[0].attributes.products.data, //kitsRes.data[0].attributes.products.data,
    },
    revalidate: 1,
  }
}

export default KitPage
