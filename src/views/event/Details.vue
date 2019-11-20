<template>
  <div class>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Event - Details</h1>
          <h2 class="subtitle">Read more about this event</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <br />
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <h1 class="title">Event:</h1>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Title: {{ event.title }}</p>
            </header>
            <div class="card-content">
              <div class="content">
                <span class="tag is-danger">{{ event.tag }}</span>
                <br />
                {{ event.short_description }}
                <br />
                {{ event.description }}
                <br />Event Date:
                <span class="has-text-weight-bold">{{ event.event_date }}</span>
                <br />
                <time>
                  Created by
                  <span class="is-italic has-text-primary">{{ event.created_by }}</span>
                </time>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="like_event" v-if="!like_status && allow_to_join === true">Like</a>
              <a class="card-footer-item" v-if="like_status">Liked</a>
              <a class="card-footer-item" v-if="!allow_to_join">Login to like</a>
              <a
                class="card-footer-item"
                v-if="allow_to_join === true && is_joined === false"
                @click="join_event"
              >Join this event!</a>
              <a
                class="card-footer-item"
                v-if="!allow_to_join"
                @click="go_to_login"
              >Login to join event</a>
              <a class="card-footer-item" v-if="is_joined">Joined</a>
            </footer>
          </div>
          <hr />
          <div class="field" v-if="is_signed_in">
            <label class="label">Add Comment</label>
            <div class="control">
              <input class="input" type="text" placeholder="Text input" v-model="comment" />
            </div>
            <br />
            <div class="control">
              <a class="button is-info" @click="add_comment">Enter</a>
            </div>
          </div>
        </div>
        <div class="column is-half">
          <h1 class="title">Comments:</h1>
          <CommentCard v-for="c in comments" :key="c.id" v-bind:comment="c" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb } from "@/firebase/firebase.js";
import CommentCard from "@/components/CommentCard.vue";

export default {
  components: {
    CommentCard
  },
  data() {
    return {
      event_id: this.$route.params.id,
      event: [],
      allow_to_join: false,
      user_ref_id: "",
      is_joined: false,
      like_status: false,
      comment: "",
      comments: [],
      is_signed_in: false
      //   email: ""
    };
  },
  methods: {
    like_event: function() {
      fireDb
        .collection("event-likes")
        .add({
          email: localStorage.getItem("current_user_email"),
          event_id: this.event_id,
          like: true
        })
        .then(() => {
          this.like_status = true;
        })
        .catch(err => {
          alert("Error liking event", err);
        });
    },
    add_comment: function() {
      fireDb
        .collection("event-comments")
        .add({
          email: localStorage.getItem("current_user_email"),
          event_id: this.event_id,
          comment: this.comment,
          published_at: new Date()
        })
        .then(() => {
          this.comment = "";
          location.reload();
        })
        .catch(err => {
          alert("Error posting comment", err);
        });
    },
    go_to_login: function() {
      this.$router.push("/login");
    },
    join_event: function() {
      fireDb
        .collection("event-attendees")
        .add({
          email: localStorage.getItem("current_user_email"),
          event_id: this.event_id,
          event_title: this.event.title
        })
        .then(() => {
          this.is_joined = true;
          alert("You have successfully joined this event.");
        })
        .catch(err => {
          alert("Error joining event", err);
        });
    },
    get_user_profile_from_firestore: function() {
      fireDb
        .collection("members")
        .where("email", "==", localStorage.getItem("current_user_email"))
        .limit(1)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.user_ref_id = doc.id;
          });
        })
        .catch(err => {
          alert("Error getting events from firebase", err);
        });
    },
    get_event_from_firestore: function() {
      fireDb
        .collection("events")
        .doc(this.event_id)
        .get()
        .then(doc => {
          this.event = doc.data();
        })
        .catch(err => {
          alert("Error getting event from firebase", err);
        });
    },
    get_comment_from_firestore: function() {
      fireDb
        .collection("event-comments")
        .where("event_id", "==", this.event_id)
        .orderBy("published_at", "desc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.comments.push(doc.data());
          });
        })
        .catch(err => {
          alert("Error getting comments from firebase", err);
        });
    },
    check_user_event_status: function() {
      fireDb
        .collection("event-attendees")
        .where("email", "==", localStorage.getItem("current_user_email"))
        .where("event_id", "==", this.event_id)
        .limit(1)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.id) {
              this.is_joined = true;
            }
          });
        })
        .catch(err => {
          alert("Error getting events from firebase", err);
        });
    },
    check_user_event_like_status: function() {
      fireDb
        .collection("event-likes")
        .where("email", "==", localStorage.getItem("current_user_email"))
        .where("event_id", "==", this.event_id)
        .limit(1)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.id) {
              this.like_status = true;
            }
          });
        })
        .catch(err => {
          alert("Error getting likes details from firebase", err);
        });
    }
  },
  created() {
    this.get_event_from_firestore();
    this.get_user_profile_from_firestore();
    this.check_user_event_status();
    this.check_user_event_like_status();
    this.get_comment_from_firestore();
    if (
      localStorage.getItem("signed_in_status") === "true" &&
      localStorage.getItem("user_approved") === "true"
    ) {
      this.allow_to_join = true;
      this.is_signed_in = true;
    }
  }
};
</script>