export const getPath = {
  mockPost: {
    view: ({postId}: {postId: string}) => `mock-post/${postId}`,
    ep: ({postId}: {postId: string}) => `/api/v1/example/mock-post/${postId}`,
  },
}
