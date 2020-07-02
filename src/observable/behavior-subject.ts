import { Callback } from "./callback"
import { Unsubscriber } from "./unsubscriber"

export class BehaviorSubject<T = any> {
  subscribers: Callback<T>[] = []

  constructor(
    private state: T,
  ) {}

  subscribe(cb: Callback<T>): Unsubscriber {
    this.subscribers.push(cb)
    cb(this.state)
    return {
      unsubscribe: () => this.subscribers = this.subscribers.filter(c => c !== cb)
    }
  }

  next(value: T) {
    this.subscribers.forEach(cb => cb(value))
  }
}