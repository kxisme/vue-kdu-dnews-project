<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand is-primary">
      <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> -->
      <router-link to="/" class="navbar-item has-text-primary has-text-weight-bold">KDU D-News</router-link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/newsletter" class="navbar-item">Newsletter</router-link>
        <router-link to="/event" class="navbar-item">Events</router-link>
        <router-link to="/event/joined" class="navbar-item" v-if="isUserSignedIn">My Events</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Admin</a>

          <div class="navbar-dropdown">
            <router-link to="/admin/members" class="navbar-item">All Members</router-link>
            <router-link to="/admin/newsletters" class="navbar-item">All Newsletters</router-link>
            <router-link to="/admin/events" class="navbar-item">All Events</router-link>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link to="/newsletter/new" class="button is-info" v-if="isUserSignedIn">New Newsletter</router-link>
            <router-link to="/event/new" class="button is-danger" v-if="isUserSignedIn">New Event</router-link>
            <router-link to="/" class="button is-light" v-if="isUserSignedIn" @click.native="sign_out">Sign Out</router-link>
            <router-link to="/sign-up" class="button is-primary" v-if="!isUserSignedIn">Sign up</router-link>
            <router-link to="/login" class="button is-light" v-if="!isUserSignedIn">Log in</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { fireAuth } from "@/firebase/firebase.js";

export default {
  methods: {
    sign_out: function() {
      fireAuth
        .signOut()
        .then(() => {
          this.is_signed_in = false
          localStorage.setItem('signed_in_status', 'false')
          localStorage.setItem('is_admin', 'false')
          localStorage.setItem('user_approved', 'false')
          localStorage.setItem('current_user_email', '')
          this.$store.dispatch('sign_out_user')
          this.$forceUpdate()
          location.href = '/'
        })
        .catch(error => {
          alert('Sign Out Error', error)
        })
    }
  },
  computed: {
    isUserSignedIn(){
      return this.$store.getters.signedInStatus
    }
  }
}
</script>