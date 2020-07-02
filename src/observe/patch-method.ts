export const patchMethod = (target: any, methodKey: string, patch: () => void) => {
  const original = target[methodKey]
  
  target[methodKey] = function () {
    original.apply(target, arguments)
    patch()
  }
}