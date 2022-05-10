//FORMERLY: [slug].js
import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import { KitResponse, ProductAttributes } from "../../types/types"

interface Props {
  kit: KitResponse
}

const Article = ({ kit }: Props) => {
  const imageUrl = getStrapiMedia(kit.attributes.thumbnail_img)

  const seo = {
    metaTitle: kit.attributes.name,
    metaDescription: kit.attributes.short_description,
    shareImage: kit.attributes.thumbnail_img,
    kit: true,
  }

  const { quote, short_description, name, publishedAt, products } =
    kit.attributes
  const { body, author } = quote.data.attributes

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <div id="banner">
        <h1>{name}</h1>
        <code>
          <pre>{JSON.stringify(kit, null, 2)}</pre>
        </code>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <p>
            {body} - {author}
          </p>
          <p>{short_description}</p>
          {Object.values(products.data).map((product) => (
            <p>{product.attributes.name}</p>
          ))}
          {/* <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div className="uk-width-expand">
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">{publishedAt}</Moment>
              </p>
            </div>
          </div> */}
        </div>
      </div>
      {/* <ReactMarkdown source={content} escapeHtml={false} /> */}
    </Layout>
  )
}

export async function getStaticPaths() {
  const kitsRes = await fetchAPI("/kits", { fields: ["slug"] })

  return {
    paths: kitsRes.data.map((kit) => ({
      params: {
        slug: kit.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const kitsRes = await fetchAPI("/kits", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
    encodeValuesOnly: true,
  })
  // const categoriesRes = await fetchAPI("/categories")

  return {
    props: { kit: kitsRes.data[0] },
    revalidate: 1,
  }
}

export default Article
