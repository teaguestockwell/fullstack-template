import {JWT} from 'next-auth/jwt'
import {client} from '../../prisma/client'

export const signInCallback = async ({jwt}: {jwt: JWT}) => {
  await client.user.upsert({
    where: {id: jwt.sub as string},

    create: {
      id: jwt.sub as string,
      email: jwt.email as string,
      oauthName: jwt.name as string,
      oauthImgSrc: jwt.picture as string,
    },

    update: {
      email: jwt.email as string,
      oauthName: jwt.name as string,
      oauthImgSrc: jwt.picture as string,
      lastSignIn: new Date(),
    },
  })
}
