<template>

  <section class="section">

    <h1 class="title">{{text$}}</h1>
    <form @submit.prevent="submitHandler">
      <input type="text" class="input" @input="inputHandler">
      <input type="submit" class="button" :disabled="disable$" :value="buttonText$">
    </form>
  </section>
</template>
<script>
import { Observable } from "rxjs"

export default {
  observableMethods: [
    "submitHandler",
    "inputHandler"
  ],
  subscriptions() {
    const input$ = this.inputHandler$
      .pluck("target", "value")
      .share()

    const [empty$, term$] = input$
      .startWith("")
      .partition(term => term === "")

    const formatResponse = res =>
      res.response.length
        ? res.response
            .map(person => person.name)
            .join(", ")
        : "No results 😭"

    const search = term =>
      Observable.ajax(
        `http://localhost:3000/people?delay=1000&name_like=${term}`
      )
        .map(formatResponse)
        .share()

    const result$ = this.submitHandler$
      .withLatestFrom(term$, (_, term) => term)
      .exhaustMap(term =>
        Observable.race(
          input$.mapTo("Cancelled 😢").take(1),
          search(term).takeUntil(input$)
        )
      )

    const text$ = Observable.merge(
      this.submitHandler$.mapTo("Loading..."),
      empty$.mapTo("Please type something!"),
      term$.mapTo("Hit enter when ready"),
      result$
    )

    const disable$ = Observable.merge(
      this.submitHandler$.mapTo(true),
      empty$.mapTo(true),
      term$.mapTo(false)
    ).startWith(true)

    const buttonText$ = Observable.merge(
      this.submitHandler$.mapTo("Loading..."),
      empty$.mapTo("Empty"),
      term$.mapTo("Search"),
      result$.mapTo("Change to Search Again")
    )

    return {
      text$,
      disable$,
      buttonText$
    }
  }
}
</script>