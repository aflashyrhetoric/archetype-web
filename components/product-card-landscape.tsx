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
    url,
    affiliate_link,
    price,
    pros,
    cons,
    long_description,
  } = product.attributes

  return (
    <div
      key={productName}
      className="productBackground uk-position-relative uk-padding-remove-bottom"
    >
      <div
        className="productBackgroundImage"
        style={{
          backgroundImage: `url('${getStrapiMedia(photo)}')`,
        }}
      ></div>
      <div className="uk-container uk-padding">
        <div className="uk-grid uk-position-relative uk-child-width-1-1 uk-child-width-1-2@m uk-margin-large-bottom">
          <div className="uk-margin-bottom">
            <div className="productSummary uk-margin uk-padding ko-border">
              <h3 className="uk-text-bolder">{productName}</h3>
              <p className="uk-text-italic uk-margin-bottom">{brandName}</p>

              <a
                href={affiliate_link || url}
                className="uk-button uk-button-default"
              >
                ${price} @ {brandName}
              </a>
            </div>
            <div>
              <h3 className="uk-text-bolder uk-margin-small">Overview</h3>
              <div className="ko-border uk-padding-small">
                <p>Pros</p>
                <ReactMarkdown>{pros}</ReactMarkdown>
                <p>Cons</p>
                <ReactMarkdown>{cons}</ReactMarkdown>
              </div>
            </div>
          </div>

          <div>
            <div className="productDescription uk-dropcap">
              <ReactMarkdown>{long_description}</ReactMarkdown>
            </div>
            <a
              href={affiliate_link || url}
              className="uk-button uk-button-default"
            >
              buy @ {brandName}
            </a>
          </div>
        </div>
      </div>
      {/* <div>
        <InTheMedia product={product} />
      </div> */}
    </div>
  )
}

export default ProductCardLandscape
