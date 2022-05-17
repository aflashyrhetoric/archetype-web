import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import {
  KitAttributes,
  KitResponse,
  ProductAttributes,
  ProductCategoryMap,
  ProductResponse,
} from "../../types/types"
import {
  DataManyBlobInResponse,
  DataSingleBlobInResponse,
} from "../../types/strapi"
import { getStrapiMedia } from "../../lib/media"
import { getStyleBlob, getThumb } from "../../lib/youtube-thumbnail"

interface Props {
  kit: DataSingleBlobInResponse<KitAttributes>
  products: DataManyBlobInResponse<ProductAttributes>
}

const KitPage = ({ kit, products }: Props) => {
  const { attributes } = kit
  const { archetype, quote, short_description, name, thumbnail_img } =
    attributes
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
      <section className="uk-section uk-section-xsmall uk-background-secondary">
        <div className="uk-container uk-container-medium">
          <section className="uk-grid uk-background-secondary uk-child-width-1-2@m  uk-flex-middle">
            <div>
              <h1 className="uk-text-bold uk-light">{name}</h1>
              <h3 className="uk-light">
                A curated kit for{" "}
                <span className="heroHighlight uk-light">
                  {archetype.data.attributes.name}
                </span>
              </h3>
            </div>
            <div>
              <NextImage image={thumbnail_img} />
            </div>
          </section>
        </div>
      </section>
      <div
        className="uk-section uk-background-cover uk-panel uk-background-secondary uk-light"
        // style={{
        //   backgroundImage: `url('${getStrapiMedia(thumbnail_img)}')`,
        // }}
      >
        <div className="uk-container uk-container-small">
          <p className="uk-text-center uk-text-large uk-text-bold">
            &quot;{body}&quot; - {author}
          </p>
          <p className="uk-text-center uk-text-large">{short_description}</p>

          <div className="uk-flex uk-flex-center uk-margin-large-bottom">
            {categories.map((category) => (
              <a
                key={category}
                className={
                  activeCategory === category
                    ? "uk-active uk-button uk-button-default"
                    : "uk-button uk-button-default"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </a>
            ))}
          </div>
        </div>

        {categoryToProductMap[activeCategory].map((product) => {
          return (
            <div
              key={product.attributes.name}
              className="uk-section uk-background-cover uk-panel productBackground"
              style={{
                backgroundImage: `url('${getStrapiMedia(
                  product.attributes.photo
                )}')`,
              }}
            >
              <div className="uk-container uk-flex uk-child-width-1-2 uk-margin-large-bottom">
                <div className="uk-flex uk-flex-column uk-flex-between">
                  <div className="uk-padding ko-border productSummary">
                    <h3 className="uk-text-bolder">
                      {product.attributes.name}
                    </h3>
                    <p className="uk-text-italic uk-margin-large-bottom">
                      {product.attributes.brand.data.attributes.name}
                    </p>

                    <Link href={product.attributes.affiliate_link} passHref>
                      <button className="uk-button uk-button-secondary">
                        buy @ {product.attributes.brand.data.attributes.name}
                      </button>
                    </Link>
                  </div>
                  <div>
                    <h3 className="uk-text-bolder">Overview</h3>
                    <p>Pros</p>
                    <ReactMarkdown>{product.attributes.pros}</ReactMarkdown>
                    <p>Cons</p>
                    <ReactMarkdown>{product.attributes.cons}</ReactMarkdown>
                  </div>
                </div>

                <div className="uk-flex uk-flex-column uk-margin-large-left">
                  <p className="productDescription uk-dropcap">
                    {product.attributes.long_description}
                  </p>
                  <button className="uk-button uk-button-default">
                    buy @ {product.attributes.brand.data.attributes.name}
                  </button>
                </div>
              </div>

              <div className="uk-container">
                <h3 className="uk-text-bolder">In the media</h3>
                <div className="uk-margin-top uk-flex uk-flex-between uk-child-width-1-3@m">
                  {product.attributes.media_product_reviews.data.map(
                    (review) => {
                      return (
                        <div
                          key={review.id}
                          className="productReview"
                          style={getStyleBlob(review.attributes.url)}
                        >
                          <div className="productReviewData">
                            <h4 className="uk-text-center uk-text-bold">
                              {review.attributes.videoTitle}
                            </h4>
                            <Link
                              href={review.attributes.url}
                              passHref
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              <button className="uk-button uk-button-secondary">
                                View @ YouTube
                              </button>
                            </Link>
                          </div>
                        </div>
                      )
                    }
                  )}
                  {/* <code>
                  <pre>{JSON.stringify(product.attributes, null, 2)}</pre>
                </code> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* <ReactMarkdown source={content} escapeHtml={false} /> */}
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
    populate: "*",
  })

  const productsRes: ProductResponse = await fetchAPI("/products", {
    populate: {
      photo: {
        populate: "*",
      },
      brand: {
        fields: ["name"],
      },
      media_product_reviews: {
        populate: "*",
      },
      kits: {
        filters: {
          name: {
            $eq: params.slug,
          },
        },
      },
    },
  })

  return {
    props: {
      kit: kitsRes.data[0],
      products: productsRes.data,
    },
    revalidate: 1,
  }
}

export default KitPage
