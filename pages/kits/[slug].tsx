//FORMERLY: [slug].js
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
  const { attributes } = kit

  const { quote, short_description, name, products, thumbnail_img } = attributes
  const { body, author } = quote.data.attributes

  const seo = {
    metaTitle: name,
    metaDescription: short_description,
    shareImage: thumbnail_img,
    kit: true,
  }

  return (
    <Layout categories={[]}>
      <Seo seo={seo} />
      <div id="banner">
        <h1>{name}</h1>
        <code>
          <pre>{JSON.stringify(kit, null, 2)}</pre>
        </code>
      </div>
      <div
        className="uk-section uk-background-cover uk-panel"
        style={{
          backgroundImage: `url('${thumbnail_img.data.attributes.url}')`,
        }}
      >
        <div className="uk-container uk-container-small">
          <NextImage image={thumbnail_img} />
          <p>
            {body} - {author}
          </p>
          <p>{short_description}</p>
          {products.data.map((product) => (
            <p>{product.attributes.name}</p>
          ))}
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
  })

  return {
    props: { kit: kitsRes.data[0] },
    revalidate: 1,
  }
}

export default Article
