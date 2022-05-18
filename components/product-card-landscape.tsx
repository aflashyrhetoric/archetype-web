import { DataSingleBlobInResponse } from "../types/strapi"
import InTheMedia from "./in-the-media"
import { ProductAttributes } from "../types/types"
import React from "react"
import ReactMarkdown from "react-markdown"
import { getStrapiMedia } from "../lib/media"

interface Props {
  product: DataSingleBlobInResponse<ProductAttributes>
}

const ProductCardLandscape: React.FC<Props> = ({ product }: any) => {
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
        <div className="uk-flex uk-flex-column">
          <div className="productSummary uk-width-3-4 uk-margin-large uk-padding ko-border">
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

export default ProductCardLandscape
