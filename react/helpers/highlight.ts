import { Product } from "vtex.product-context/react/ProductTypes";

const getRegexHighlight = (highlightName: string) => {
  const regExp = /\((.*)\)/;
  const matches = regExp.exec(highlightName);
  return matches ? matches[1] : '';
};

export const getHighlights = (product: Product | undefined, types: string[]) => {
  if (!product) return []

  const highlights: { type: string; name: string }[] = []

  types.forEach((type) => {
    switch (type) {
      case 'offer':
        const offers = product.items?.[0]?.sellers?.[0]?.commertialOffer?.discountHighlights ?? []
        offers.forEach((hl) => highlights.push({ type, name: getRegexHighlight(hl.name) }))
        break
      case 'teaser':
        const teasers = product.items?.[0]?.sellers?.[0]?.commertialOffer?.teasers ?? []
        teasers.forEach((hl) => highlights.push({ type, name: getRegexHighlight(hl.name) }))
        break
      case 'collection':
        const clusters = product.clusterHighlights ?? []
        clusters.forEach((hl, i) => i === 0 && highlights.push({ type, name: `cluster-${hl.id}` }))
        break
    }
  })

  return highlights
}