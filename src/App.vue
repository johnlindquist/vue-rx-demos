<template>
  <section class="section">
    <b-tabs v-model="activeTab">
      <b-tab-item label="I'm a tab">
      </b-tab-item>
    </b-tabs>
    <h1 class="title">The "UI/Content Sync" Scenario</h1>
    <img src="" alt="">
  </section>
</template>

<script>
import { Observable } from "rxjs"

export default {
  data() {
    return {
      activeTab: 0
    }
  }
}
</script>