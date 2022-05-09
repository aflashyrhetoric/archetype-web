import React from "react"
import ReactMarkdown from "react-markdown"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

const Home = ({ hero, seo, explore_archetypes }) => {
  const { heading, subheading, kits } = explore_archetypes
  const { data: kitsList } = kits

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{hero.title}</h1>

          <h2>{heading}</h2>
          <p>{subheading}</p>
          {kitsList.map((kit) => {
            const { name, card_summary, main_description } = kit.attributes
            return (
              <div key={name}>
                <h2>{name}</h2>
                <ReactMarkdown source={card_summary} escapeHtml={false} />
                <ReactMarkdown source={main_description} escapeHtml={false} />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [homepageRes] = await Promise.all([
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
        explore_archetypes: { populate: "*" },
      },
    }),
  ])

  const { hero, seo, explore_archetypes } = homepageRes?.data.attributes

  return {
    props: {
      hero,
      seo,
      explore_archetypes,
    },
    revalidate: 1,
  }
}

export default Home
