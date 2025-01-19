import { hauskaa } from './cli'

describe('cli', () => {
  it('should have hauskaa', () => {
    const r = hauskaa('world')
    expect(r).toBe('WORLD')
  })
})
