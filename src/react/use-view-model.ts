import { useEffect, useState } from "react"
import { patch, subscribe } from "../observe"

export const useViewModel: ViewModelFactory = (ctor: any, ...args: any[]) => {
  const [ vm ] = useState(() => {
    try {
      return new ctor(...args)
    } catch (error) {
      return ctor(...args)
    }
  })
  const forceUpdate = useState(Object.create(null))[1]

  useEffect(() => {
    const vm$ = patch(vm)
    const sub = subscribe(vm$, () => forceUpdate(Object.create(null)))
    return () => sub.unsubscribe()
  }, [ctor, forceUpdate, vm])

  return vm
}

export type ViewModelFactory = {
  <T>(ctor: (() => T) | (new () => T)): T;
  <T, A0>(ctor: ((a0: A0) => T) | (new (a0: A0) => T), a0: A0): T;
  <T, A0, A1>(ctor: ((a0: A0, a1: A1) => T) | (new (a0: A0, a1: A1) => T), a0: A0, a1: A1): T;
  <T, A0, A1, A2>(ctor: ((a0: A0, a1: A1, a2: A2) => T) | (new (a0: A0, a1: A1, a2: A2) => T), a0: A0, a1: A1, a2: A2): T;
  <T, A0, A1, A2, A3>(ctor: ((a0: A0, a1: A1, a2: A2, a3: A3) => T) | (new (a0: A0, a1: A1, a2: A2, a3: A3) => T), a0: A0, a1: A1, a2: A2, a3: A3): T;
  <T, A0, A1, A2, A3, A4>(ctor: ((a0: A0, a1: A1, a2: A2, a3: A3, a4: A4) => T) | (new (a0: A0, a1: A1, a2: A2, a3: A3, a4: A4) => T), a0: A0, a1: A1, a2: A2, a3: A3, a4: A4): T;
  <T, A0, A1, A2, A3, A4, A5>(ctor: ((a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => T) | (new (a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => T), a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5): T;
  <T, A0, A1, A2, A3, A4, A5, A6>(ctor: ((a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => T) | (new (a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => T), a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6): T;
  <T, A0, A1, A2, A3, A4, A5, A6, A7>(ctor: ((a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7) => T) | (new (a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7) => T), a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7): T;
  <T, A0, A1, A2, A3, A4, A5, A6, A7, A8>(ctor: ((a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8) => T) | (new (a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8) => T), a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8): T;
  <T, A0, A1, A2, A3, A4, A5, A6, A7, A8, A9>(ctor: ((a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8, a9: A9) => T) | (new (a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8, a9: A9) => T), a0: A0, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7, a8: A8, a9: A9): T;
  // <T>(ctor: new (...args: any[]) => T, ...args: any[]): T;
}