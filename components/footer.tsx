import { DataSingleBlobInResponse } from "../types/strapi"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { FooterResponse, ProductAttributes } from "../types/types"
import React from "react"
import { getStyleBlob } from "../lib/youtube-thumbnail"

interface Props {
  footer: FooterResponse
}

const Footer: React.FC<Props> = ({ footer }: Props) => {
  console.log(footer)
  // const { browse_by_archetypes, company_copy, footer_heading } =
    // footer.data.attributes

  return (
    // <div className="uk-container uk-position-relative">
    //   <h3 className="uk-text-bolder">{footer_heading}</h3>
    //   <div className="uk-margin-top uk-flex uk-flex-between uk-child-width-1-3@m">
    //     <ReactMarkdown>{company_copy}</ReactMarkdown>
    //   </div>
    //   <ReactMarkdown>{browse_by_archetypes}</ReactMarkdown>
    // </div>
    <h2>hi</h2>
  )
}

export default Footer
