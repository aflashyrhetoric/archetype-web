import { DataSingleBlobInResponse } from "../types/strapi"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { FooterAttributes } from "../types/types"
import React from "react"
import { getStyleBlob } from "../lib/youtube-thumbnail"

interface Props {
  footer: FooterAttributes
}

const Footer: React.FC<Props> = ({ footer }: Props) => {
  const { browse_by_archetypes, company_copy, footer_heading } = footer

  return (
    <div className="uk-container uk-position-relative">
      <h3 className="uk-text-bolder">{footer_heading}</h3>
      <div className="uk-margin-top uk-flex uk-flex-between uk-child-width-1-3@m">
        <ReactMarkdown>{company_copy}</ReactMarkdown>
      </div>
      <ReactMarkdown>{browse_by_archetypes}</ReactMarkdown>
    </div>
  )
}

export default Footer
