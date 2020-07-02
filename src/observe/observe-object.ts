import { Subject } from "../observable"
import { getState } from "./state"
import { mergeSubscribers } from "./merge-subscriptions"
import { isArray, isObject } from "./check-type"
import { observeArray } from "./observe-array"

export const observeObject = (
  source: Array<any>, 
  update$: Subject<void>,
) => {
  for (const key in source) {
    if (getState(source[key])) {
      mergeSubscribers(update$, getState(source[key]).onChange)
      continue
    }
    if (isArray(source[key])) {
      source[key] = observeArray(source[key], update$)
    }
    if (isObject(source[key])) {
      source[key] = observeObject(source[key], update$)
    }
    const proxy: any = {}
    proxy[key] = source[key]
    Object.defineProperty(source, key, {
      enumerable: true,
      get: () => {
        return proxy[key]
      },
      set: (value) => {
        if (proxy[key] === value) {
          return true
        }
        proxy[key] = value
        update$.next()
      }
    })
  } 
  return source
}