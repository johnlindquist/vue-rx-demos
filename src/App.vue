<template>
  <section class="section">
    <h1 class="title">
      {{slide$}}
    </h1>
  </section>
</template>
<script>
import { Observable } from "rxjs"

export default {
  subscriptions() {
    const keys$ = Observable.fromEvent(
      window,
      "keydown"
    ).pluck("key")

    const left$ = keys$.filter(
      key => key === "ArrowLeft"
    )
    const right$ = keys$.filter(
      key => key === "ArrowRight"
    )

    const index$ = Observable.merge(
      left$.mapTo(-1),
      right$.mapTo(1)
    )
      .throttleTime(250)
      .startWith(0)
      .scan((i, direction) => i + direction)

    const slide$ = Observable.of([
      "Hi, I'm John Lindquist",
      "egghead.io founder",
      "vue-rx",
      "RxJS isn't easy",
      "I'm not smart",
      '"Badass: Making Users Awesome" - Kathy Sierra',
      "Perceptual Exposure",
      "Your Brain Will Detect Patterns"
    ]).combineLatest(
      index$,
      (slides, index) => slides[index]
    )

    return {
      slide$
    }
  }
}
</script>