<template>

  <section class="section">
    <div v-if="!done$">
      <h1 class="title">{{output$}}</h1>
      <b-modal :active="stillThere$">

        <div class="content">
          <h1 class="title has-text-white">Still there?</h1>
          <h1 class="title has-text-white">{{countdown$}}</h1>
        </div>

      </b-modal>
    </div>
    <div v-else>
      <h1 class="title">Bye!</h1>
    </div>
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

    const mousemove$ = Observable.fromEvent(
      window,
      "mousemove"
    ).map(({ clientX, clientY }) => ({
      clientX,
      clientY
    }))

    const eventsTimeout$ = Observable.merge(
      keys$,
      mousemove$
    ).switchMapTo(
      Observable.timer(1000).mapTo("Still there?")
    )

    const stillThere$ = Observable.merge(
      mousemove$.mapTo(false),
      keys$.mapTo(false),
      eventsTimeout$.mapTo(true)
    )

    const countdown$ = stillThere$.switchMap(() =>
      Observable.interval(1000)
        .startWith(5)
        .scan(remaining => remaining - 1)
        .takeWhile(i => i >= 0)
    )

    const done$ = countdown$
      .filter(value => value === 0)
      .mapTo(true)
      .startWith(false)

    const output$ = Observable.merge(
      mousemove$,
      keys$
    )

    return {
      output$,
      stillThere$,
      countdown$,
      done$
    }
  }
}
</script>