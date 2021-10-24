it('mocks local storage', () => {
  localStorage.setItem('foo', 'bar')
  expect(localStorage.getItem('foo')).toBe('bar')
})

it('resets local storage in between tests', () => {
  expect(localStorage.getItem('foo')).toBe(undefined)
})

export {}
