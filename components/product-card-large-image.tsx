import Link from "next/link"
import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import { getStrapiMedia } from "../lib/media"
import { getStyleBlob } from "../lib/youtube-thumbnail"
import { DataSingleBlobInResponse } from "../types/strapi"
import { ProductAttributes } from "../types/types"

interface Props {
  product: DataSingleBlobInResponse<ProductAttributes>
}

const ProductCardLargeImage: React.FC<Props> = ({ product }: any) => {
  const {
    name: productName,
    photo,
    brand: {
      data: {
        attributes: { name: brandName },
      },
    },
    affiliate_link,
    price,
    pros,
    cons,
    long_description,
    media_product_reviews: { data: productReviews },
  } = product.attributes

  return (
    <div key={productName} className="uk-section uk-panel productBackground">
      <div
        className="productBackgroundImage"
        style={{
          backgroundImage: `url('${getStrapiMedia(photo)}')`,
        }}
      ></div>
      <div className="uk-container uk-flex uk-child-width-1-2 uk-margin-large-bottom">
        <div className="uk-flex uk-flex-column uk-flex-between">
          <div className="uk-width-3-4 uk-margin-large-bottom uk-padding ko-border productSummary">
            <h3 className="uk-text-bolder">{productName}</h3>
            <p className="uk-text-italic uk-margin-bottom">{brandName}</p>

            <a href={affiliate_link} className="uk-button uk-button-default">
              ${price} @ {brandName}
            </a>
          </div>
          <div className="uk-width-3-4">
            <h3 className="uk-text-bolder uk-margin-small">Overview</h3>
            <div className="ko-border uk-padding-small">
              <p>Pros</p>
              <ReactMarkdown>{pros}</ReactMarkdown>
              <p>Cons</p>
              <ReactMarkdown>{cons}</ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="uk-flex uk-flex-column">
          <p className="productDescription uk-dropcap">{long_description}</p>
          <button className="uk-button uk-button-default">
            buy @ {brandName}
          </button>
        </div>
      </div>
      <div className="uk-container">
        <h3 className="uk-text-bolder">In the media</h3>
        <div className="uk-margin-top uk-flex uk-flex-between uk-child-width-1-3@m">
          {productReviews.map((review) => {
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
          })}
        </div>
      </div>
    </div>
  )
}

export default ProductCardLargeImage
