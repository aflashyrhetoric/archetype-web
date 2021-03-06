import React, { useEffect, useRef } from "react"
import { DataSingleBlobInResponse } from "../types/strapi"
import InTheMedia from "./in-the-media"
import NextImage from "../components/image"
import { ProductAttributes } from "../types/types"
import ReactMarkdown from "react-markdown"
import { getStrapiMedia, imgSrcToLinearGradientString } from "../lib/media"

interface Props {
  product: DataSingleBlobInResponse<ProductAttributes>
}

const ProductCardPortrait: React.FC<Props> = ({ product }: Props) => {
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

  const currentProductRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPhotoColor = async () => {
      const gs = await imgSrcToLinearGradientString(getStrapiMedia(photo))
      currentProductRef.current.style.setProperty("--gradient-string", gs)
    }
    fetchPhotoColor()
  })

  return (
    <div
      key={productName}
      className="productBackground animated uk-position-relative portrait"
      ref={currentProductRef}
    >
      <div className="uk-container uk-padding">
        <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m uk-margin-large-bottom">
          <div className="uk-margin uk-margin-remove-bottom@m">
            <div className="ko-border productSummary uk-margin uk-padding">
              <h3 className="uk-text-bolder">{productName}</h3>
              <p className="uk-text-italic uk-margin-bottom">{brandName}</p>

              <a href={affiliate_link} className="uk-button uk-button-default">
                ${price} @ {brandName}
              </a>
            </div>
            <div className="productPhoto">
              <NextImage image={photo} />
            </div>
          </div>
          <div>
            <div className="uk-container">
              <h3 className="uk-text-bolder uk-margin-small">Overview</h3>
              <div className="ko-border uk-flex uk-width-1-1 uk-child-width-1-2 uk-padding-small uk-margin-bottom">
                <div>
                  <p>Pros</p>
                  <ReactMarkdown>{pros}</ReactMarkdown>
                </div>
                <div>
                  <p>Cons</p>
                  <ReactMarkdown>{cons}</ReactMarkdown>
                </div>
              </div>
              <div className="productDescription uk-dropcap">
                <ReactMarkdown>{long_description}</ReactMarkdown>
              </div>
              <button className="uk-button uk-button-default">
                buy @ {brandName}
              </button>
            </div>
          </div>
        </div>
      </div>
      <InTheMedia product={product} />
    </div>
  )
}

export default ProductCardPortrait
