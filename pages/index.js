import React from "react"
import ReactMarkdown from "react-markdown"
import KitCard from "../components/kit-card"
import NextImage from "../components/image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

const Home = ({ hero, seo, explore_archetypes }) => {
  const { heading, subheading, kits } = explore_archetypes
  const { data: kitsList } = kits

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <section className="uk-section uk-section-xsmall uk-background-muted">
        <div className="uk-container uk-container-medium">
          <section className="uk-grid uk-background-muted uk-child-width-1-2@m  uk-flex-middle">
            <div>
              <h1>{hero.title}</h1>
              <button className="uk-button uk-button-primary">
                shop archetypes
              </button>
            </div>
            <div>
              <NextImage image={hero.hero_image} />
            </div>
          </section>
        </div>
      </section>
      <section className="uk-section">
        <h2 className="uk-text-center">{heading}</h2>
        <p className="uk-text-center">{subheading}</p>
        <div className="uk-grid uk-grid-medium uk-flex-center">
          {kitsList.map((kit) => (
            <div key={kit.name} className="uk-width-1-4@m">
              <KitCard attributes={kit.attributes} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [homepageRes] = await Promise.all([
    fetchAPI("/homepage", {
      populate: {
        hero: { populate: "*" },
        seo: { populate: "*" },
        explore_archetypes: {
          populate: {
            kits: {
              populate: "thumbnail_img",
            },
          },
        },
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
