import Image from "next/image"

const ImageCard = ({
  image,
  className,
}: {
  image: {
    src: string
    alt: string
  }
  className?: string
}) => {
  if (!image) return null
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={image.src} alt={image.alt} fill className="object-cover" />
    </div>
  )
}

export default ImageCard
