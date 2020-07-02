import { Callback } from "./callback";
import { Unsubscriber } from "./unsubscriber";

export interface Subscriber<T = any> {
  subscribe: (cb: Callback<T>) => Unsubscriber
}