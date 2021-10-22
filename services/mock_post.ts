export const getAllPostIds = async ({limit}: {limit: number}) => {
  return new Array(10000)
    .fill(null)
    .map((_, i) => i.toString())
    .slice(0, limit)
}

export const getPost = async (id: string) => {
  return {
    id,
    title: `Post ${id} title`,
    body: `Post ${id} body`,
  }
}

export type ReadDeep = {id: string; title: string; body: string}
