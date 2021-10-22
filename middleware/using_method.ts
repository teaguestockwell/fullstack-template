import {ApiError} from './using_middleware'

// if the request method is not supported, throw an error to return a 405
export const usingMethod = async (
  req: Types.Next.NextApiRequest,
  allowedMethods: string[] | undefined = ['PUT', 'DELETE', 'GET']
): Promise<string> => {
  const {method} = req

  if (!method || !allowedMethods.includes(method)) {
    throw new ApiError({
      status: 405,
      body: {msg: `supported method(s): ${allowedMethods.join(', ')}`},
    })
  }

  return method
}
