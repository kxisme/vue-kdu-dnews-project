<template>
  <div class>
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">My Events</h1>
          <h2 class="subtitle">All events I'm Going</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <br />
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <div class="card" v-for="event in events" v-bind:key="event.id" v-bind:event="event" style="margin-top: 10px;">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{event.data().event_title}}</p>
                </div>
              </div>

              <div class="content">
                <router-link
                  :to="{ name: 'eventDetails', params: { id: event.data().event_id }}"
                  class="has-text-danger"
                >Event Details</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from "@/firebase/firebase.js";

export default {
  data() {
    return {
      events: []
    };
  },
  async created() {
    var email = localStorage.getItem("current_user_email")
    await fireDb
      .collection("event-attendees")
      .where("email", "==", email)
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