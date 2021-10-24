beforeEach(() => {
  // the initial key value needs to be provided for this to work
  const store: Record<string, string> = {
    test: 'test',
  }

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => {
    return store[key]
  })
})

export {}
