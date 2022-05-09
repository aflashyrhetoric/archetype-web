import React from "react"
import ReactMarkdown from "react-markdown"
import NextImage from "./image"

const KitCard = ({ attributes }) => {
  const { name, card_summary, thumbnail_img } = attributes
  return (
    <div className="uk-card uk-card-secondary" key={name}>
      <div className="uk-card-header">
        <h3 className="uk-card-title uk-text-center">{name}</h3>
      </div>
      <div className="uk-card-body">
        <NextImage image={thumbnail_img} />
        <p>
          <ReactMarkdown source={card_summary} escapeHtml={false} />
        </p>
      </div>
    </div>
  )
}

export default KitCard
