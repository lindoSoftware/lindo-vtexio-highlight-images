export const PRODUCT_QUERY = `
  query ($skuId: ID!) {
    product(identifier: { field: sku, value: $skuId }) @context(provider: "vtex.search-graphql") {
        productId
        productName
        clusterHighlights {
            id
            name
        }
        items {
            itemId
            name
        sellers {
            commertialOffer {
                discountHighlights {
                    name
                }
                teasers {
                    name
                }
            }
        }
        }
    }
}
`;
export const PRODUCT_SEARCH = `
  query ($skuId: ID!) {
  productSearch(
    query: $skuId
    map: "ft"
    from: 0
    to: 0
    simulationBehavior: default
  ) @context(provider: "vtex.search-graphql") {
    products {
      productId
        productName
        clusterHighlights {
            id
            name
        }
        items {
            itemId
            name
        sellers {
            commertialOffer {
                discountHighlights {
                    name
                }
                teasers {
                    name
                }
            }
        }
        }
    }
  }
}
`;
