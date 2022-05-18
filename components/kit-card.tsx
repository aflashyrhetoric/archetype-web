import { KitAttributes } from "../types/types"
import Link from "next/link"
import NextImage from "./image"
import React from "react"
import ReactMarkdown from "react-markdown"

const KitCard = ({ attributes }: { attributes: KitAttributes }) => {
  const { name, card_summary, slug, thumbnail_img } = attributes
  return (
    <div className="uk-card uk-card-default uk-card-hover" key={name}>
      <div className="uk-card-header">
        <h3 className="uk-card-title uk-text-center uk-text-bold">{name}</h3>
      </div>
      <div className="uk-card-body">
        <NextImage image={thumbnail_img} />
        <p>
          <ReactMarkdown source={card_summary} escapeHtml={false} />
        </p>
        <div className="uk-flex uk-flex-center">
          <Link href={`/kits/${slug}`} passHref>
            <button className="uk-button uk-button-large uk-button-default uk-width-1-1">
              visit {name}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default KitCard
