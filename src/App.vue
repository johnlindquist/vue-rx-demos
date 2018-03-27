<template>
  <section class="section">
    <h1 class="title">{{countdown$}}</h1>
    <button :disabled="disable$" v-stream:click="snooze$" class="button is-success">Snooze</button>
    <button :disabled="disable$" v-stream:click="dismiss$" class="button is-danger">Dismiss</button>
  </section>
</template>
<script>
import { Observable } from "rxjs"

export default {
  domStreams: ["snooze$", "dismiss$"],
  subscriptions() {
    const countdown$ = Observable.interval(250)
      .startWith(5)
      .scan(time => time - 1)
      .takeWhile(time => time > 0)
      .concat(Observable.of("Wake up! 🎉"))
      .repeatWhen(() =>
        this.snooze$.takeUntil(this.dismiss$)
      )
      .concat(
        Observable.of("Have a nice day! 🤗")
      )
      .share()

    const disable$ = countdown$.map(
      text => text !== "Wake up! 🎉"
    )

    return {
      countdown$,
      disable$
    }
  }
}
</script>