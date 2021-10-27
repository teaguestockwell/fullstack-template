import {render, screen} from '@testing-library/react'
import {Content} from '../../components/content'

const Test = () => <div>Test</div>

it('renders', () => {
  render(
    <Content>
      <Test />
    </Content>
  )
  expect(screen.getByText('Test')).toBeInTheDocument()
})
