import { intToShortUrl, shortUrlToInt } from './shortUrl'

describe('shortUrl generator', () => {
  it('generates unique strings', () => {
    const under62 = 42
    const over62 = 64999
    expect(intToShortUrl(under62)).toBe('g')
    expect(intToShortUrl(over62)).toBe('NuG')
  })
  it('looks what dedicated urls look like', () => {
    expect(shortUrlToInt('graphql')).toBe(2434709206011)
    expect(shortUrlToInt('health')).toBe(39993529145)
  })
  it('checks backward compat', () => {
    const int = 42
    expect(shortUrlToInt(intToShortUrl(int))).toBe(int)
  })
})
