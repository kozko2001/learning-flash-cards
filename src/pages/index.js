import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Card from "../components/flash-card/flashCard"

const IndexPage = (props) => {
  const questions = props.data.allMarkdownRemark.edges.map(e => e.node)
  const cards = questions.map(q => <Card ast={q.htmlAst} />)

  
  return (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>

    {cards}

    <Link to="/page-2/">Go to page 2</Link>
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
