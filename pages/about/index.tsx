import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import Footer from "../../components/footer"
import NextImage from "../../components/image"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { fetchAPI } from "../../lib/api"
import { AboutPageProps, AboutResponse } from "../../types/types"

const AboutPage = (props: AboutPageProps) => {
  console.log("props", props.global)
  const { about, hero, seo, global } = props
  const { page_heading, about_archetype_text } = about
  const { title, hero_image } = hero
  const { metaTitle, metaDescription, shareImage } = seo
  // console.log(global)

  const seoData = {
    metaTitle,
    metaDescription,
    shareImage,
    kit: true,
  }

  return (
    <Layout categories={[]}>
      <Seo seo={seoData} />
      <div className="uk-section uk-section-small uk-background-cover uk-background-secondary uk-light">
        <div className="uk-container">
          <div className="ko-icon">
            <NextImage image={hero_image} />
          </div>
          <h1 className="uk-text-large uk-margin-remove-top">{page_heading}</h1>
        </div>
        <hr className="uk-divider-icon"></hr>
        <div className="uk-container">
          <ReactMarkdown>{about_archetype_text}</ReactMarkdown>
        </div>
      </div>
      <Footer footer={global.attributes.footer} />
    </Layout>
  )
}

export async function getStaticProps() {
  const aboutRes: AboutResponse = await fetchAPI("/about", {
    populate: {
      hero: { populate: "*" },
      about: { populate: "*" },
      seo: { populate: "*" },
    },
  })

  const { hero, about, seo } = aboutRes.data.attributes

  return {
    props: {
      hero,
      about,
      seo,
    },
    revalidate: 1,
  }
}

export default AboutPage
