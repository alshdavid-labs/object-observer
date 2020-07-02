import { Subscriber, Callback, Unsubscriber } from "../observable";

export function getState<T>(value: T): ReactiveState<T> {
  return (value as any).__reactive_state
}

export function subscribe<T>(value: T, cb: Callback<T>): Unsubscriber {
  return getState(value).onChange.subscribe(() => cb(value))
}

export class ReactiveState<T = any> {
  constructor(
    public onChange: Subscriber<T>
  ) {} 
}