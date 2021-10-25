import {getValidatedToken} from '../pages/api/auth/[...nextauth]'
import {ApiError} from './using_middleware'

/** 
 if the req has not been authenticated, this middleware will throw and stop the req. This can be used to protect routes.
*/
export const usingJWT = async (req: Types.Next.NextApiRequest) => {
  const jwt = await getValidatedToken(req)

  if (!jwt) {
    throw new ApiError({status: 403, body: {msg: 'you must be signed in'}})
  }

  if (!jwt?.email || !jwt.sub || !jwt.picture || !jwt.name) {
    throw new ApiError({
      status: 500,
      body: 'there is a problem with your account, please try to login again',
    })
  }

  return jwt
}

/** 
 similar to use jwt, but it will not stop execution by throwing if the request does not have a jwt
*/
export const usePossibleJWT = async (req: Types.Next.NextApiRequest) => {
  const jwt = await getValidatedToken(req)
  return jwt
}
