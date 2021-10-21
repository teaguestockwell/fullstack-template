import {Example} from '../components/exampe'

const Page = () => {
  
  const one: Types.Example.Type1 = {
    foo: 'hello',
    bar: 'world'
  }

  return <Example one={one} />
}

export default Page