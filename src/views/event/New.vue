<template>
  <div class="container">
    <br />
    <br />
    <div class="columns is-mobile is-centered" v-if="!error_status">
      <div class="column is-half">
        <h1 class="title has-text-danger">Create new event</h1>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" type="text" placeholder="Fashion Competition" v-model="title" />
          </div>
        </div>

        <div class="field">
          <label class="label">Tag</label>
          <div class="control">
            <input class="input" type="text" placeholder="Eg: fashion" v-model="tag" />
          </div>
        </div>

        <div class="field">
          <label class="label">Event Date</label>
          <div class="control">
            <input class="input" type="date" placeholder="12/11/2019" v-model="event_date" />
          </div>
        </div>

        <div class="field">
          <label class="label">Short description</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="short description about your event"
              v-model="short_description"
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">Content</label>
          <div class="control">
            <textarea class="textarea" placeholder="your event content" v-model="description"></textarea>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="create_event">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-centered" v-if="error_status">
      <div class="column is-half">
        <h2 class="title has-text-danger has-text-centered">{{ error_msg }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb, fireAuth } from "@/firebase/firebase.js";

export default {
  data() {
    return {
      title: "",
      tag: "",
      short_description: "",
      description: "",
      created_by: "",
      event_date: "",
      account_status: "",
      error_status: false,
      error_msg: ""
    };
  },
  methods: {
    add_event_to_firestore: function() {
      fireDb
        .collection("events")
        .add({
          title: this.title,
          tag: this.tag,
          short_description: this.short_description,
          description: this.description,
          status: "denied",
          created_by: this.created_by,
          event_date: this.event_date,
          date_published: new Date()
        })
        .then(() => {
          alert(
            "Event " + " created successfuly. The Admin will review your event."
          );
          this.$router.push("/");
        })
        .catch(function(error) {
          alert("Error creating event: ", error);
        });
    },
    create_event: function() {
      this.get_current_user_email();
      if (localStorage.getItem('user_approved') === "true") {
        this.add_event_to_firestore();
      }else{
        this.error_status = true
        this.error_msg = "Your account is not approved by the admin. You're not authorised to create new event."
      }
    },
    get_current_user_email: function() {
      var user = fireAuth.currentUser;
      this.created_by = user.email;
    },
    check_user_status: function() {
      fireDb
        .collection("members")
        .where("email", "==", this.created_by)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if(doc.data().status === "approved"){
              localStorage.setItem('user_approved', true)
            }else{
              localStorage.setItem('user_approved', false)
            }
          });
        })
        .catch(err => {
          alert("Error getting user account status from firebase", err);
        });
    }
  }
};
</script>

