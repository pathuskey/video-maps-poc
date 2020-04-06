import React from "react"
import Img from "gatsby-image"
import { Button } from "reactstrap"

import "./videoCard.scss"

export default ({ title, image, onClick }) => {
  return (
    <div
      className="video-card"
      // onClick={onClick}
      // onKeyDown={onClick}
      // role="button"
      // tabIndex={0}
    >
      <div className="video-card__img">
        <Img className="video-card__img-inner" fixed={image} alt={title} />
      </div>
      <Button
        color="link"
        className="video-card__title text-center stretched-link"
        onClick={onClick}
      >
        <small>{title}</small>
      </Button>
    </div>
  )
}
