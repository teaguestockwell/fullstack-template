import MatchMediaMock from 'jest-matchmedia-mock'

let matchMedia

beforeAll(() => {
  matchMedia = new MatchMediaMock()
})
