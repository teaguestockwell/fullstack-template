export const Provider = ({children}) => {
  return <div data-testid="next-auth-mock-provider">{children}</div>
}

// [session, isLoading]
export const useSession = () => [null, false]
