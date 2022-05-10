import React from "react"
import ReactMarkdown from "react-markdown"
import NextImage from "./image"
import Link from "next/link"

const KitCard = ({ attributes }) => {
  const { name, card_summary, slug, thumbnail_img } = attributes
  return (
    <div className="uk-card uk-card-default uk-card-hover" key={name}>
      <div className="uk-card-header">
        <h3 className="uk-card-title uk-text-center">{name}</h3>
      </div>
      <div className="uk-card-body">
        <NextImage image={thumbnail_img} />
        <p>
          <ReactMarkdown source={card_summary} escapeHtml={false} />
        </p>
        <Link href={`/kits/${slug}`} passHref>
          <button className="uk-button uk-button-default">visit {name}</button>
        </Link>
      </div>
    </div>
  )
}

export default KitCard
