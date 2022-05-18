import Link from "next/link"
import React from "react"
import { getStyleBlob } from "../lib/youtube-thumbnail"

interface Props {
  product: DataSingleBlobInResponse<ProductAttributes>
}

const InTheMedia: React.FC<Props> = ({ product }: Props) => {
  const {
    media_product_reviews: { data: productReviews },
  } = product.attributes

  if (productReviews.length === 0) {
    return <></>
  }

  return (
    <div className="uk-container uk-position-relative">
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
  )
}

export default InTheMedia
