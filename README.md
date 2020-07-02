# Reactive Channels

Use `async` and `await` to handle streams!<br/>
This is inspired by the Go implementation of channels and rxjs

[Playground (codesandbox.io)](https://codesandbox.io/s/suspicious-bhaskara-h706w)

## Installation

800 <b>bytes</b> gziped

```bash
npm install --save reactive-channels

# Or
# yarn add reactive-channels
```

## Basic Channel

```javascript
import { Channel } from 'reactive-channels'

const numbers = new Channel<number>()

void async function(){
  // For loop will pause waiting for the next emit()
  for (const number of numbers) {
    console.log(await number)
  }
}()

numbers.emit(1)
numbers.emit(2)
numbers.emit(3)
```

## Wrap DOM Events

```javascript
import { eventListener } from 'reactive-channels'

const onscroll = eventListener(window, 'scroll')

for (const event of onscroll) {
  console.log(await event)
}
```

## Convert to Promise

Easily convert to a promise

```javascript
import { Channel } from 'reactive-channels'

const chan = new Channel<string>()

void async function(){
  const value = await chan.toPromise()
  console.log(value)
}()

chan.emit('foobar')
chan.complete()
```

## Operators

Includes a few operators to implement reactive style functional programming
<br/>Feel free to make pull requests to add more

```javascript
import { Channel } from 'reactive-channels'
import { pipe, first, filter, map, tap } from "reactive-channels/operators"

const a$ = new Channel<number>()

const b$ = pipe(a$)(
  map(v => v + 1),
  filter(v => v === 4),
  tap(console.log),
  first()
)

void async function(){
  for (const value of b$) {
    console.log(await value)
  }
}()

a$.emit(1)
a$.emit(2)
a$.emit(3)
```