import {renderWrapped, screen} from '../setup/render_wrapped'

const Test = () => <div>Hello</div>

it('renders tests wrapped with providers', () => {
  renderWrapped(<Test />)
  expect(screen.getByText('Hello')).toBeInTheDocument()
})
