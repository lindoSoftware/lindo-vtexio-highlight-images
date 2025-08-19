import { PRODUCT_QUERY } from "../utils/queries/queries";
import { useGraphQL } from "./useGraphQL"

export function useSearchProduct<T>(skuId: string | undefined) {
  const { data, loading, error } = useGraphQL<T>(
    PRODUCT_QUERY,
    { skuId }
  )

  return { data, loading, error }
}
