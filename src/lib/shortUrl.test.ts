import { intToShortUrl, shortUrlToInt } from './shortUrl'

describe('shortUrl generator', () => {
  it('generates unique strings', () => {
    const zero = 0
    const under62 = 42
    const over62 = 64999
    expect(intToShortUrl(zero)).toBe('0')
    expect(intToShortUrl(under62)).toBe('g')
    expect(intToShortUrl(over62)).toBe('GuN')
  })
  it('looks what dedicated urls look like', () => {
    expect(shortUrlToInt('B1')).toBe(683)
    expect(shortUrlToInt('Xo9')).toBe(129961)
  })
  it('checks backward compat', () => {
    const int = 42
    const short = 'g1'
    expect(shortUrlToInt(intToShortUrl(int))).toBe(int)
    expect(intToShortUrl(shortUrlToInt(short))).toBe(short)
  })
})
