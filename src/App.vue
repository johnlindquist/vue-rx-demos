<template>

  <section class="section">
    <b-notification :active="done$">
      <h1>Signed out</h1>
    </b-notification>
    <h1 class="title">{{output$}}</h1>
    <div class="subtitle">{{events$}}</div>
  </section>
</template>

<script>
import { Observable } from "rxjs"

export default {
  subscriptions() {
    const keys$ = Observable.fromEvent(
      window,
      "keydown"
    )
      .pluck("key")
      .scan((text, key) => text + key)

    const mouse$ = Observable.fromEvent(
      window,
      "mousemove"
    ).map(event => ({
      x: event.clientX,
      y: event.clientY
    }))

    const events$ = Observable.merge(
      keys$,
      mouse$
    )

    const countdown$ = Observable.interval(500)
      .startWith(3)
      .scan(time => time - 1)
      .takeWhile(time => time >= 0)

    const output$ = events$
      .switchMapTo(
        Observable.of("Keep it up! 👍").concat(
          countdown$.delay(500)
        )
      )
      .takeWhile(value => value != 0)
      .concat(Observable.of("We'll miss you! 🤧"))

    const done$ = Observable.of(false).concat(
      output$
        .last()
        .delay(500)
        .mapTo(true)
    )

    return {
      events$,
      output$,
      done$
    }
  }
}
</script>