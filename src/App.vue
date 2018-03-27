<template>
  <section class="section">
    <b-modal :active="error$">
      <h1 class="has-text-white">You Appear Offline</h1>
      <button v-stream:click="retry$" class="button">Retry</button>
    </b-modal>

    <button v-stream:click="load$" class="button">Load</button>

    <h1 class="title">{{name$}}</h1>
    <img :src="image$" alt="">
  </section>
</template>
<script>
import { Observable } from "rxjs"
export default {
  domStreams: ["load$", "retry$"],
  subscriptions() {
    const person$ = Observable.merge(
      this.load$,
      this.retry$
    )
      .switchMapTo(
        Observable.ajax(
          `http://localhost:3000/people/0`
        )
          .map(res => res.response)
          .catch(() => Observable.of("error"))
      )
      .share()

    const error$ = person$.map(
      message => message === "error"
    )

    const name$ = person$.pluck("name")
    const image$ = person$
      .pluck("image")
      .map(
        image => `http://localhost:3000/${image}`
      )

    return {
      name$,
      image$,
      error$
    }
  }
}
</script>