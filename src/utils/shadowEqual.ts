const keyList = Object.keys

// 浅度比较 {a:1} {b:1}  {a:{b:1}}使用deepEqual比较
export const shadowEqual = (a: any, b: any): boolean => {
  if (a === b) return true

  if (!(a instanceof Object) || !(b instanceof Object)) return false

  const keys = keyList(a)
  const { length } = keys

  for (let i = 0; i < length; i++) {
    if (!(keys[i] in b)) return false
  }

  for (let i = 0; i < length; i++) if (a[keys[i]] !== b[keys[i]]) return false

  return length === keyList(b).length
}

