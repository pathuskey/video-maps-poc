import React from "react"
import Map from "../components/Map"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

const Attribute = ({ label, value }) => {
  if (value) {
    return (
      <p className="mb-0">
        {label && <strong>{label}:</strong>} {value}
      </p>
    )
  }

  return null
}

export default ({ data }) => {
  const {
    mapSettings,
    trail,
    markers,
    title,
    trailType,
    distance,
    difficulty,
    time,
  } = data.trail.frontmatter

  return (
    <Layout>
      <Map
        zoom={mapSettings.zoom}
        center={mapSettings.centerPoint}
        trail={trail}
        markers={markers}
      />

      <section className="text-center mt-4">
        {title && <h1 className="h2 mb-4 text-primary">{title}</h1>}

        <Attribute label="Type" value={trailType} />
        <Attribute label="Difficulty" value={difficulty} />
        <Attribute label="Distance" value={distance} />
        <Attribute label="Average Time" value={time} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TrailPage($id: String!) {
    trail: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        trail {
          publicURL
        }
        mapSettings {
          centerPoint {
            lat
            long
          }
          zoom
        }
        difficulty
        distance
        time
        markers {
          point {
            lat
            long
          }
          videos {
            id
            startTime
            title
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 100) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
        trailType
      }
    }
  }
`
