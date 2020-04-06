import React, { useEffect, useState, useRef } from "react"
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet"
import L from "leaflet"
import { Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap"
import VideoCard from "./VideoCard"
import YouTube from "react-youtube"

import "./map.scss"

export default ({ zoom, center, trail, markers }) => {
  const [geoJson, setGeoJson] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [videoOptions, setVideoOptions] = useState()

  const youtubeOptions = {
    playerVars: {
      modestbranding: 1,
      rel: 0,
      enablejsapi: 1,
      start: videoOptions?.startTime || "",
      origin: typeof window !== "undefined" ? window.location.origin : "",
    },
  }

  const playerRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetch(trail.publicURL)
        .then((response) => response.json())
        .then((data) => {
          setGeoJson(data)
        })
    }

    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    })

    fetchData()
  }, [trail.publicURL])

  useEffect(() => {
    playVideo()
  }, [videoOptions])

  const closeModal = () => {
    setModalOpen(false)
    pauseVideo()
  }

  const playerReady = () => {
    playVideo()
  }

  const pauseVideo = () => {
    if (playerRef?.current?.internalPlayer) {
      playerRef.current.internalPlayer.pauseVideo()
    }
  }

  const playVideo = () => {
    if (playerRef?.current?.internalPlayer) {
      playerRef.current.internalPlayer.playVideo()
    }
  }

  return (
    <>
      <Map
        className="map"
        center={[center.lat, center.long]}
        zoom={zoom}
        animate
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoJson && <GeoJSON data={geoJson} color="red" weight={5} />}

        {markers &&
          markers.map((marker, i) => (
            <Marker key={i} position={[marker.point.lat, marker.point.long]}>
              {marker.videos && marker.videos.length > 0 && (
                <Popup maxWidth="none" keepInView={false}>
                  <Row className="flex-nowrap p-2">
                    {marker.videos.map((video, i) => (
                      <Col
                        key={i}
                        xs={12 / marker.videos.length}
                        className="px-2"
                      >
                        <VideoCard
                          title={video.title}
                          image={video.thumbnail.childImageSharp.fixed}
                          onClick={() => {
                            setModalOpen(true)

                            setVideoOptions({
                              id: video.id,
                              title: video.title,
                              startTime: video.startTime,
                            })
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Popup>
              )}
            </Marker>
          ))}
      </Map>

      <Modal
        isOpen={modalOpen}
        toggle={closeModal}
        className="video-modal"
        unmountOnClose={false}
        centered
        size="lg"
      >
        <ModalHeader toggle={closeModal}>
          {videoOptions?.title || ""}
        </ModalHeader>
        <ModalBody className="p-0">
          {videoOptions?.id && (
            <YouTube
              containerClassName="embed-responsive embed-responsive-16by9"
              className="embed-responsive-item"
              videoId={videoOptions.id}
              opts={youtubeOptions}
              onReady={playerReady}
              ref={playerRef}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  )
}
