import {Content} from '../../components/content'
import {render, screen} from '@testing-library/react'

const Test = () => <div>Test</div>

it('renders', () => {
  render(
    <Content>
      <Test />
    </Content>
  )
  expect(screen.getByText('Test')).toBeInTheDocument()
})
