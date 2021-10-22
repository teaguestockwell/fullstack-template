it('mocks local storage', () => {
  localStorage.setItem('foo', 'bar')
  expect(localStorage.getItem('foo')).toBe('bar')
})

export {}
