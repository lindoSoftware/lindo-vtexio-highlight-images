import { useEffect, useState } from "react"
import { graphqlRequest } from "../services/graphqlClient"

interface GraphQLHookResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): GraphQLHookResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)
      try {
        const result = await graphqlRequest<T>(query, variables)
        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
          setData(null)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [query, JSON.stringify(variables)]) // 👈 reejecuta cuando cambian variables

  return { data, loading, error }
}
