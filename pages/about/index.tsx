import React, { useState } from "react"
import NextImage from "../../components/image"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { fetchAPI } from "../../lib/api"
import { AboutResponse } from "../../types/types"

const AboutPage = ({ about, hero, seo }) => {
  const { page_heading, about_archetype_text } = about
  const { title, hero_image } = hero
  const { metaTitle, metaDescription, shareImage } = seo

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
        <div className="uk-container uk-container-small">
          <span uk-icon="icon: check"></span>
          <p className="uk-text-center uk-text-large">{page_heading}</p>
        </div>
        <hr className="uk-divider-icon"></hr>
        <NextImage image={hero_image} />
      </div>
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
