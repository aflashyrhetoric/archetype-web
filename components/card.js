import React from "react"
import Link from "next/link"
import NextImage from "./image"

const Card = ({ article }) => {
  const {
    attributes: { name, slug, photo },
  } = article
  return (
    <Link href={`/article/${slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <NextImage image={photo} />
          </div>
          <div className="uk-card-body">
            {name}
            {/* <p id="category" className="uk-text-uppercase">
              {article.attributes.category.name}
            </p>
            <p id="title" className="uk-text-large">
              {article.attributes.title}
            </p> */}
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
