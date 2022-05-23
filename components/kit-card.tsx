import { KitAttributes } from "../types/types"
import Link from "next/link"
import NextImage from "./image"
import React from "react"
import ReactMarkdown from "react-markdown"

const KitCard = ({ attributes }: { attributes: KitAttributes }) => {
  const { name, card_summary, slug, thumbnail_img } = attributes
  return (
    <div
      className="uk-card uk-card-default uk-card-hover uk-margin-small-bottom"
      key={name}
    >
      <div className="uk-card-media-top">
        <NextImage image={thumbnail_img} />
      </div>
      {/* <div className="uk-card-header"></div> */}
      <div className="uk-card-body uk-flex uk-flex-column uk-flex-between">
        <div className="uk-card-badge uk-label">updated</div>
        <h3 className="uk-card-title uk-text-center uk-text-bold">{name}</h3>
        <ReactMarkdown>{card_summary}</ReactMarkdown>
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
