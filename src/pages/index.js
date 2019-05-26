import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/flash-card/flashCard"

const IndexPage = (props) => {
  const questions = props.data.allMarkdownRemark.edges.map(e => e.node)
  const cards = questions.map(q => <Card ast={q.htmlAst} />)

  
  return (
  <Layout>
    <SEO title="Home" />
    <h1>My Daily Learning</h1>
    <p>Welcome to my daily learning using flashcards and space repetition</p>

    {cards}

  </Layout>
)}

export const query = graphql`
  query Questions {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}
    ) {
      edges {
        node {
          htmlAst
        }
      }
    }
  }
`

export default IndexPage
