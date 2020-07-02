import { getState } from "./state"
import { Subject } from "../observable"
import { isArray, isObject } from "./check-type"
import { observeArray } from "./observe-array"
import { observeObject } from "./observe-object"

export function observe(
  source: any, 
  update$: Subject<void>
): any {
  if (getState(source)) {
    return source
  }
  if (isArray(source)) {
    return observeArray(source, update$)
  }
  if (isObject(source)) {
    return observeObject(source, update$)
  }
}
