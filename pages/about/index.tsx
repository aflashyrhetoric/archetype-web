import React, { useState } from "react"
import NextImage from "../../components/image"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { fetchAPI } from "../../lib/api"
import { AboutResponse } from "../../types/types"

const AboutPage = ({
  about,
  hero,
  seo: { metaTitle, metaDescription, shareImage },
}) => {
  console.log(about)
  const { page_heading, about_archetype_text } = about
  const { title, hero_image } = hero

  const seo = {
    metaTitle,
    metaDescription,
    shareImage,
    kit: true,
  }

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <div>
        <h1>{title}</h1>
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
  console.log(aboutRes)

  const { hero } = aboutRes.data.attributes

  return {
    props: {
      hero,
    },
    revalidate: 1,
  }
}

export default AboutPage
