import KitCard from "../components/kit-card"
import Layout from "../components/layout"
import NextImage from "../components/image"
import React from "react"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

const Home = ({ hero, seo, explore_archetypes }) => {
  const { heading, subheading, kits } = explore_archetypes
  const { data: kitsList } = kits

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <section className="uk-section uk-section-xsmall uk-section-secondary">
        <div className="uk-container uk-container-medium uk-margin-large-bottom">
          <section className="uk-grid uk-child-width-1-2@m  uk-flex-middle">
            <div>
              <h1 className="uk-text-bolder uk-margin-large-bottom">
                {hero.title}
              </h1>
              <button className="uk-button uk-button-primary uk-button-large">
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
        <div className="uk-container">
          <h2 className="uk-text-center uk-text-bold">{heading}</h2>
          <p className="uk-text-center uk-margin-large-bottom">{subheading}</p>
          <div className="uk-grid uk-grid-match uk-flex-center">
            {kitsList.map((kit) => (
              <div key={kit.name} className="uk-width-1-2@s uk-width-1-3@m">
                <KitCard attributes={kit.attributes} />
              </div>
            ))}
          </div>
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

  const { hero, seo, explore_archetypes } = homepageRes.data.attributes

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
