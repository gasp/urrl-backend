// more about base62: https://en.wikipedia.org/wiki/Base62
const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const intToShortUrl = (id: number): string => {
  if (id === 0) {
    return BASE62[0]
  }
  let shortUrl = ''
  while (id > 0) {
    shortUrl += BASE62[id % 62]
    id = Math.floor(id / 62)
  }
  return shortUrl.split('').reverse().join('')
}
export const shortUrlToInt = (shortUrl: string): number => {
  let id = 0
  for (let i = 0; i < shortUrl.length; i++) {
    id = id * 62 + BASE62.indexOf(shortUrl[i])
  }
  return id
}
