export type WithUser = Types.Prisma.Feedback & {
  id: string
  user: {
    oauthName: string
    oauthImgSrc: string
  }
}
