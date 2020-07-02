import { useEffect, useState } from "react"
import { patch, subscribe } from "../observe"

export const useViewModel = <T>(ctor: () => T): T => {
  const [ vm ] = useState(() => ctor())
  const forceUpdate = useState(Object.create(null))[1]

  useEffect(() => {
    const vm$ = patch(vm)
    const sub = subscribe(vm$, () => forceUpdate(Object.create(null)))
    return () => sub.unsubscribe()
  }, [ctor, forceUpdate, vm])

  return vm
}
