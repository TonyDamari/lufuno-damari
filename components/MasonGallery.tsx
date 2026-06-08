interface MasonryGalleryProps {
  images: GalleryImage[]
  columns?: number
}

export interface GalleryImage {
  src: string
  alt: string
}

const gridHeight = ["290", "290", "174", "155", "349", "250", "349", "155", "250", "290", "155", "309"]

const MasonGallery = ({ images, columns = 4 }: MasonryGalleryProps) => {
  const columnImages = Array.from({ length: columns }, () => [] as GalleryImage[])

  images.forEach((image, index) => {
    columnImages[index % columns].push(image)
  })

  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
      {columnImages.splice(0, 12).map((column, columnIndex) => (
        <div key={columnIndex} className="gap-4 grid">
          {column.map((image, imageIndex) => (
            <div key={imageIndex}>
              <img
                src={image.src}
                alt={image.alt}
                width="232"
                height={gridHeight[imageIndex]}
                className="shadow rounded-xl w-full"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MasonGallery
