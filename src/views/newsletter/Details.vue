<template>
  <div class>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Newsletter - Details</h1>
          <h2 class="subtitle">Read more about this newsletter</h2>
        </div>
      </div>
    </section>
    <div class="container">
      <br />
      <br />
      <div class="columns is-mobile is-centered">
        <div class="column is-half">
          <h1 class="title">Newsletter:</h1>
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Title: {{ newsletter.title }}</p>
            </header>
            <div class="card-content">
              <div class="content">
                <span class="tag is-danger">{{ newsletter.tag }}</span>
                <br />
                {{ newsletter.short_description }}
                <br />
                {{ newsletter.description }}
                <br />
                <time>
                  Created by
                  <span
                    class="is-italic has-text-primary"
                  >{{ newsletter.created_by }}</span>
                </time>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click="like_newsletter" v-if="!like_status && allow_to_join === true">Like</a>
              <a class="card-footer-item" v-if="like_status">Liked</a>
              <a class="card-footer-item" v-if="!allow_to_join">Login to like</a>
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
      newsletter_id: this.$route.params.id,
      newsletter: [],
      allow_to_join: false,
      user_ref_id: "",
      is_joined: false,
      like_status: false,
      comment: "",
      comments: [],
      is_signed_in: false
    };
  },
  methods: {
    like_newsletter: function() {
      fireDb
        .collection("newsletter-likes")
        .add({
          email: localStorage.getItem("current_user_email"),
          newsletter_id: this.newsletter_id,
          like: true
        })
        .then(() => {
          this.like_status = true;
        })
        .catch(err => {
          alert("Error liking newsletter", err);
        });
    },
    add_comment: function() {
      fireDb
        .collection("newsletter-comments")
        .add({
          email: localStorage.getItem("current_user_email"),
          newsletter_id: this.newsletter_id,
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
    get_newsletter_from_firestore: function() {
      fireDb
        .collection("news")
        .doc(this.newsletter_id)
        .get()
        .then(doc => {
          this.newsletter = doc.data();
        })
        .catch(err => {
          alert("Error getting newsletters from firebase", err);
        });
    },
    get_comment_from_firestore: function() {
      fireDb
        .collection("newsletter-comments")
        .where("newsletter_id", "==", this.newsletter_id)
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
    check_user_newsletter_like_status: function() {
      fireDb
        .collection("newsletter-likes")
        .where("email", "==", localStorage.getItem("current_user_email"))
        .where("newsletter_id", "==", this.newsletter_id)
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
    this.get_newsletter_from_firestore();
    this.check_user_newsletter_like_status();
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