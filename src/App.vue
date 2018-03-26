<template>
  <section class="section">
    <b-tabs v-model="activeTab">
      <b-tab-item :label="person.name" v-for="person of people$" :key="person.id">
      </b-tab-item>
    </b-tabs>
    <h1 class="title">{{name$}}</h1>
    <img :src="image$" alt="">
  </section>
</template>

<script>
console.clear()
import { Observable } from "rxjs"

export default {
  data() {
    return {
      activeTab: 0
    }
  },
  subscriptions() {
    const people$ = Observable.ajax(
      `http://localhost:3000/people`
    ).map(res => res.response.slice(0, 5))

    const activeTab$ = this.$watchAsObservable(
      "activeTab",
      { immediate: true }
    )

    const person$ = activeTab$
      .pluck("newValue")
      .switchMap(id =>
        Observable.ajax(
          `http://localhost:3000/people/${id}`
        ).map(res => res.response)
      )
      .share()

    const image$ = person$
      .pluck("image")
      .map(img => `http://localhost:3000/${img}`)
    const name$ = person$.pluck("name")

    return {
      people$,
      image$,
      name$
    }
  }
}
</script>