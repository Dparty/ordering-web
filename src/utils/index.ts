//检查object的每个属性是否为空。只要有一个属性为空就返回true
const isEmptyObject = (object: Record<string, string> | undefined | null): boolean => {
  if (object === null || object === undefined) {
    return true
  }

  // 检查对象本身是否为空
  if (Object.keys(object).length === 0) {
    return true
  }

  let flag = false

  // 检查对象的属性值是否为空
  for (let key in object) {
    if (object[key] == '' || object[key] === undefined) {
      flag = true
      return flag
    }
  }
  return flag
}
export default {
  isEmptyObject
}
