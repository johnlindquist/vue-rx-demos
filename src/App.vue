<template>
  <section class="section">
    <button v-stream:click="load$" class="button">Load</button>
    <h1 class="title">{{name$}}</h1>
    <img :src="image$" alt="">
  </section>
</template>
<script>
import { Observable } from "rxjs"
export default {
  domStreams: ["load$"],
  subscriptions() {
    const name$ = Observable.of("Some Name")
    const image$ = Observable.of("Image")

    return {
      name$,
      image$
    }
  }
}
</script>