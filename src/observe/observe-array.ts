import { Subject } from "../observable"
import { mergeSubscribers } from "./merge-subscriptions"
import { getState } from "./state"
import { isArray, isObject } from "./check-type"
import { observeObject } from "./observe-object"
import { patchMethod } from "./patch-method"

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

export const observeArray = (
  source: Array<any>, 
  update$: Subject<void>,
) => {
  for (let i = 0; i < source.length; i++) {
    if (getState(source[i])) {
      mergeSubscribers(update$, getState(source[i]).onChange)
      continue
    }
    if (isArray(source[i])) {
      source[i] = observeArray(source[i], update$)
    }
    if (isObject(source[i])) {
      source[i] = observeObject(source[i], update$)
    }
  }
  for (const method of methodsToPatch) {
    patchMethod(source, method, () => {
      update$.next()
    })
  }
  return source
}