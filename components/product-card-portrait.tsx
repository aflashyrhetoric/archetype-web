import { DataSingleBlobInResponse } from "../types/strapi"
import InTheMedia from "./in-the-media"
import NextImage from "../components/image"
import { ProductAttributes } from "../types/types"
import React from "react"
import ReactMarkdown from "react-markdown"

interface Props {
  product: DataSingleBlobInResponse<ProductAttributes>
}

const ProductCardPortrait: React.FC<Props> = ({ product }: any) => {
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
    <div key={productName} className="productBackground uk-section uk-panel">
      <div className="uk-container uk-flex uk-child-width-1-2 uk-margin-large-bottom">
        <div className="uk-flex uk-flex-column">
          <div className="ko-border productSummary uk-width-3-4 uk-margin-large uk-padding">
            <h3 className="uk-text-bolder">{productName}</h3>
            <p className="uk-text-italic uk-margin-bottom">{brandName}</p>

            <a href={affiliate_link} className="uk-button uk-button-default">
              ${price} @ {brandName}
            </a>
          </div>
          <div className="productPhoto uk-width-3-4">
            <NextImage image={photo} />
          </div>
        </div>

        <div className="uk-flex uk-flex-column">
          <div className="uk-width-1-1">
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
          </div>
          <div className="productDescription uk-dropcap">
            <ReactMarkdown>{long_description}</ReactMarkdown>
          </div>
          <button className="uk-button uk-button-default">
            buy @ {brandName}
          </button>
        </div>
      </div>
      <InTheMedia product={product} />
    </div>
  )
}

export default ProductCardPortrait
