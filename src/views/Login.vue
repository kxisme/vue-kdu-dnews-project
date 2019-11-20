<template>
  <div class="container">
    <br />
    <br />
    <div class="columns is-mobile is-centered">
      <div class="column is-half">
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input class="input" type="text" placeholder="johndoe@kdu.com" v-model="email" />
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" placeholder="password" v-model="password" />
          </div>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-primary" @click="login">Login</button>
          </p>
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
      email: "",
      password: "",
      error_status: false,
      error_msg: ""
    };
  },
  methods: {
    check_user_admin_status: function() {
      fireDb
        .collection("members")
        .where("email", "==", this.email)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            // this.members.push(doc);
            if(doc.data().role === "admin"){
              localStorage.setItem("is_admin", true);
            }else{
              localStorage.setItem("is_admin", false);
            }
          });
        })
        .catch(err => {
          alert("Error getting current member info", err);
        });
    },
    check_user_status: function() {
      fireDb
        .collection("members")
        .where("email", "==", this.email)
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
    },
    login: function() {
      this.check_user_status()
      fireAuth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          localStorage.setItem("signed_in_status", true);
          localStorage.setItem("current_user_email", this.email)
          this.$store.dispatch("sign_in_user");
          this.check_user_admin_status();
          this.$router.push("/");
        })
        .catch(error => {
          this.error_status = true;
          this.error_msg = error.message;
        });
      // localStorage.getItem('signed_in_status')
      // this.$store.dispatch("sign_in_user");
    }
  }
};
</script>