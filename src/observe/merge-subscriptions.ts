import { Subscriber } from '../observable'

export const mergeSubscribers = (target$: Subscriber, add$: Subscriber) => {
  const subscribe = target$.subscribe

  target$.subscribe = (v: any) => {
    const sub1 = add$.subscribe.bind(add$)(v)
    const sub2 = subscribe.bind(target$)(v)
    return {
      unsubscribe: () => {
        sub1.unsubscribe()
        sub2.unsubscribe()
      }
    }
  }
}