import { Callback } from "./callback"
import { Unsubscriber } from "./unsubscriber"

export class Subject<T = any> {
  subscribers: Callback<T>[] = []

  subscribe(cb: Callback<T>): Unsubscriber {
    this.subscribers.push(cb)
    return {
      unsubscribe: () => this.subscribers = this.subscribers.filter(c => c !== cb)
    }
  }

  next(value: T) {
    this.subscribers.forEach(cb => cb(value))
  }
}