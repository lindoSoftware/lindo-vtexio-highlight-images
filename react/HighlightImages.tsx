import React from 'react'
import { useProduct } from 'vtex.product-context'
import { getHighlights } from './helpers/highlight'
import { FILES_PATH } from './utils/config'
import { useSearchProduct } from './hooks/useSearchProduct'
import { Product } from 'vtex.product-context/react/ProductTypes'

type HighlightImagesProps = {
  types?: ('offer' | 'teaser' | 'collection')[]
  gap?: number
  imageExtension?: 'png' | 'jpeg'
  maxWidth?: string
  isSearchResult: boolean
}

const HighlightImages = ({
  types = ['offer', 'teaser', 'collection'],
  gap = 6,
  imageExtension = 'png',
  maxWidth = '60px'
}: HighlightImagesProps) => {
  const productContext = useProduct()

  const product = productContext?.product

  const { data, error } = useSearchProduct<{product: Product}>(product?.items[0].itemId)

  if (!product || error) return null

  const highlights = getHighlights(data?.product, types)

  if (!highlights.length) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
      {highlights.map((hl, idx) => {
        const src = `${FILES_PATH}/${hl.name}.${imageExtension}`
        return hl.name && 
          (
            <img
              key={`${hl.type}-${hl.name}-${idx}`}
              src={src}
              alt={hl.name}
              style={{ maxWidth, height: 'auto', display: 'block' }}
            />
          )
      })}
    </div>
  )
}

export default HighlightImages
