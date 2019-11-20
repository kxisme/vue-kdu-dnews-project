<template>
  <div class>
    <section class="hero is-danger">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">All Events</h1>
          <h2 class="subtitle">List of events of KDU D-News</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <br />
      <div class="columns is-mobile is-centered">
        <div class="column is-full">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Tag</th>
                <th>Event Date</th>
                <th>Description</th>
                <th>Attendees</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(event, index) in events" :key="event.id">
                <td>{{ index+1 }}</td>
                <td>{{ event.data().title }}</td>
                <td>{{ event.data().tag }}</td>
                <td>{{ event.data().event_date }}</td>
                <td>{{ event.data().short_description }}</td>
                <td>{{ event.data().created_by }}</td>
                <td>Newton Law</td>
                <td>
                  <button
                    class="button is-small is-success"
                    v-if="event.data().status === 'denied'"
                    @click="set_event_status(event.id, 'approved')"
                  >Approve Event</button>
                  <button
                    class="button is-small is-danger"
                    v-if="event.data().status === 'approved'"
                    @click="set_event_status(event.id, 'denied')"
                  >Deny Event</button>
                  <button
                    class="button is-small is-light"
                    style="margin-left: 10px;"
                    @click="delete_event(event.id)"
                  >Delete Event</button>
                </td>
              </tr>
            </tbody>
          </table>
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
  methods: {
    delete_event: function(event_id) {
      fireDb
        .collection("events")
        .doc(event_id)
        .delete()
        .then(function() {
          location.href = "/admin/events";
        })
        .catch(function(error) {
          alert("Error removing event: ", error);
        });
    },
    get_all_events: function() {
      fireDb
        .collection("events")
        .orderBy("date_published", "desc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.events.push(doc);
          });
        })
        .catch(err => {
          alert("Error getting events", err);
        });
    },
    set_event_status: function(event_id, status) {
      fireDb
        .collection("events")
        .doc(event_id)
        .update({
          status: status
        })
        .then(function() {
          location.href = "/admin/events";
        })
        .catch(function(error) {
          alert("Error updating document: ", error);
        });
    }
  },
  async created() {
    await this.get_all_events();
  }
};
</script>
