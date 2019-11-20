<template>
  <div class>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Newsletter</h1>
          <h2 class="subtitle">Latest KDU Newsletter</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <br />
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <NewsletterCard
            v-for="news in news_object"
            v-bind:key="news.id"
            v-bind:newsletter="news"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from "@/firebase/firebase.js";

import NewsletterCard from "@/components/NewsletterCard.vue";

export default {
  components: {
    NewsletterCard
  },
  data() {
    return {
      news_object: []
    };
  },
  async created() {
    await fireDb
      .collection("news")
      .where("status", "==", "approved")
      .orderBy("date_published", "desc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.news_object.push(doc);
        });
      })
      .catch(err => {
        alert("Error getting newsletters from firebase", err);
      });
  }
};
</script>