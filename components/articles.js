import React from "react"
import Card from "./card"

const Products = ({ products }) => {
  const leftProductsCount = Math.ceil(products.length / 5)
  const leftProducts = products.slice(0, leftProductsCount)
  const rightProducts = products.slice(leftProductsCount, products.length)

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid="true">
        <div>
          {leftProducts.map((article, i) => {
            return (
              <Card
                article={article}
                key={`article__left__${article.attributes.slug}`}
              />
            )
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {rightProducts.map((article, i) => {
              return (
                <Card
                  article={article}
                  key={`article__left__${article.attributes.slug}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
