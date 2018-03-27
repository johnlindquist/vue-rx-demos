<template>

  <section class="section">
    <h1 class="title">{{text$}}</h1>
    <button :disabled="active$" v-stream:click="snooze$" class="button is-success">Snooze</button>
    <button :disabled="active$" v-stream:click="dismiss$" class="button is-danger">Dismiss</button>
  </section>
</template>

<script>
console.clear()
import { Observable } from "rxjs"

export default {
  domStreams: ["dismiss$", "snooze$"],

  subscriptions() {
    const text$ = Observable.interval(250)
      .startWith(5)
      .scan(time => time - 1)
      .takeWhile(time => time > 0)
      .concat(Observable.of("Wake up!"))
      .repeatWhen(() =>
        this.snooze$.takeUntil(this.dismiss$)
      )
      .concat(
        Observable.of("Have a great day! 🤗")
      )
      .share()

    const active$ = text$
      .map(
        value =>
          value === "Wake up!" ? false : true
      )
      .startWith(true)

    return {
      text$,
      active$
    }
  }
}
</script>