<template>
  <section class="section">
    <b-tabs v-model="activeTab">
      <b-tab-item label="Tab label goes here">
      </b-tab-item>
    </b-tabs>
    <h1 class="title">Sync UI and Content</h1>
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