import React from "react"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <section type="content" className="text-center">
        <h1>Page Not Found</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
      </section>
    </Layout>
  )
}

export default NotFoundPage
