<template>
  <div class>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Home</h1>
          <h2 class="subtitle">Latest curated newsletters and events in KDU</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <br />
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <h1 class="title has-text-info">Newsletter</h1>
          <NewsletterCard
            v-for="news in news_object"
            v-bind:key="news.id"
            v-bind:newsletter="news"
          />
        </div>
        <div class="column is-half">
          <h1 class="title has-text-danger">Events</h1>
          <EventCard v-for="event in events" v-bind:key="event.id" v-bind:event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from "@/firebase/firebase.js";

import EventCard from "@/components/EventCard.vue";
import NewsletterCard from "@/components/NewsletterCard.vue";

export default {
  components: {
    NewsletterCard,
    EventCard
  },
  data() {
    return {
      events: [],
      news_object: []
    };
  },
  methods: {
    get_all_newsletter: function() {
      fireDb
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
    },
    get_all_event: function() {
      fireDb
        .collection("events")
        .where("status", "==", "approved")
        .orderBy("date_published", "desc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.events.push(doc);
          });
        })
        .catch(err => {
          alert("Error getting events from firebase", err);
        });
    }
  },
  async created() {
    await this.get_all_newsletter();
    await this.get_all_event();
  }
};
</script>
