import React from "react"
import Helmet from "react-helmet"

export default ({ children }) => {
  return (
    <>
      <Helmet title="Video Maps POC" />

      <main>{children}</main>
    </>
  )
}
