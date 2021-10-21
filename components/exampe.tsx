export const Example = (
  {
    one
  }: {
    one: Types.Example.Type1
  }
) => {
  return <div>Example foo: {one.foo} bar: {one.bar}</div>
}