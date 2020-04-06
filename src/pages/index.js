import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/Layout"
import { Link, graphql } from "gatsby"

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <ul>
        {data.trails.edges.map((edge, i) => (
          <li key={i}>
            <Link to={edge.node.fields.slug}>
              {edge.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    trails: allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
