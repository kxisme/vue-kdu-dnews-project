<template>
  <div class="container">
    <br />
    <br />
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" placeholder="Lady Gagak" v-model="name" />
          </div>
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="email" placeholder="Email" v-model="email" />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="Password" v-model="password" />
          </div>
        </div>

        <div class="field">
          <label class="label">Short description about yourself</label>
          <div class="control">
            <textarea class="textarea" placeholder="I'm funny and cute.." v-model="bio"></textarea>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="sign_up">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light" @click="$router.go(-1)">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-mobile is-centered" v-if="user_created">
      <div class="column is-half">
        <h1 class="title has-text-primary has-text-centered">Sign Up Successful</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { fireDb, fireAuth } from "@/firebase/firebase.js";

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      bio: '',
      user_created: false
    }
  },
  methods: {
    add_member_to_firestore: function() {
      fireDb
        .collection('members')
        .add({
          name: this.name,
          email: this.email,
          password: this.password,
          bio: this.bio,
          role: 'standard',
          status: 'denied'
        }).then(() => {
          location.href = '/login'
        })
    },
    sign_up: function() {
      // this.add_member_to_firestore()
      fireAuth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.add_member_to_firestore()
          // location.href = '/login'
        })
        .catch(function(error) {
          var errorMessage = error.message
          console.log(errorMessage)
        })
    }
  }
};
</script>