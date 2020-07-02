import { Subject } from '../observable'
import { observe } from './observe'
import { ReactiveState } from './state'

export function patch<T = any>(source: T): T {
  const update$ = new Subject<void>()
  const proxy = observe(source, update$)
  proxy.__reactive_state = new ReactiveState(update$)
  return proxy
}








