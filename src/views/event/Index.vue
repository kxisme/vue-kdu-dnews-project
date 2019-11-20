<template>
  <div class>
    <section class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Events</h1>
          <h2 class="subtitle">Latest events happening in KDU</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <br />
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <EventCard v-for="event in events" v-bind:key="event.id" v-bind:event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from "@/firebase/firebase.js";

import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  async created() {
    await fireDb
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
};
</script>