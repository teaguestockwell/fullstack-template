import {ApiError} from './using_middleware'

// if the request method is not supported, throw an error to return a 405
export const usingMethods = async (
  req: Types.Next.NextApiRequest,
  allowedMethods: string[] | undefined = ['PUT', 'DELETE', 'GET']
): Promise<string> => {
  const {method} = req

  console.info({method})
  console.log('asd')

  if (
    !method ||
    typeof method !== 'string' ||
    !allowedMethods.includes(method.toUpperCase())
  ) {
    throw new ApiError({
      status: 405,
      body: {msg: `supported method(s): ${allowedMethods.join(', ')}`},
    })
  }

  return method
}
