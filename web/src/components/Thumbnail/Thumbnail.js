import { Image } from '@mantine/core'
import { generateVideoThumbnailViaUrl } from '@rajesh896/video-thumbnails-generator'
import { useEffect, useState, useRef } from 'react'

const Thumbnail = ({ url, height, width }) => {
  const [image, setImage] = useState(null)
  useRef(image)
  useEffect(() => {
    generateVideoThumbnailViaUrl(url, 0)
      .then((thumbnailArray) => {
        setImage(thumbnailArray)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [image])
  return <Image src={image} height={height && height} width={width && width} />
}

export default Thumbnail
