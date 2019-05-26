import React from "react"

import Layout from "../components/layout"
import Card from '../components/flash-card/flashCard'

const CategoryPage = (props) => {
  console.log()
  console.log(props.category)
  const cards = props.pageContext.cards.map(q => <Card ast={q.ast} />)

  return (
  <Layout>
    <h1>{props.pageContext.category}</h1>

    {cards}

  </Layout>
)}

export default CategoryPage
