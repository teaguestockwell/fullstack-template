export const GlobalTypes = ({one}: {one: Types.Example.Type1}) => {
  return (
    <div>
      <p>example of global types</p>
      <p>{`${one.foo} ${one.bar}`}</p>
    </div>
  )
}
