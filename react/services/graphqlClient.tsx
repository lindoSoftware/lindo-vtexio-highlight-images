import { STORE_RESOURCES } from "../utils/config"

export interface GraphQLResponse<T> {
  data: T
  errors?: any
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const response = await fetch(
      `/_v/private/${STORE_RESOURCES}/graphiql/v1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      }
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const result: GraphQLResponse<T> = await response.json()

    if (result.errors) {
      console.error("GraphQL errors:", result.errors)
      throw new Error("GraphQL request failed")
    }

    return result.data
  } catch (error) {
    console.error("GraphQL request error:", error)
    throw error
  }
}
