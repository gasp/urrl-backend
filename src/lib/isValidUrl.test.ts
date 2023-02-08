import { isValidHttpUrl } from './isValidUrl'

describe('url validation', () => {
  it('recognizes valid http urls', () => {
    expect(isValidHttpUrl('http://ryogasp.com/1234')).toBe(true)
    expect(isValidHttpUrl('http://ລາວ.icom.museum/ລາວ.html')).toBe(true)
    expect(isValidHttpUrl('http://77.168.18.22')).toBe(true)
  })
  it('rejects invalid urls', () => {
    expect(isValidHttpUrl('ryogasp.com')).toBe(false)
    expect(isValidHttpUrl('ftp://ryogasp.com')).toBe(false)
    expect(isValidHttpUrl('http://')).toBe(false)
  })
})
