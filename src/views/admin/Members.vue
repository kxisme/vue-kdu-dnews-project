<template>
  <div class>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">All Members</h1>
          <h2 class="subtitle">List of members of KDU D-News</h2>
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
                <th>Name</th>
                <th>Email</th>
                <th>Bio</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in members" :key="member.id">
                <td>{{ index+1 }}</td>
                <td>{{ member.data().name }}</td>
                <td>{{ member.data().email }}</td>
                <td>{{ member.data().bio }}</td>
                <td>
                  <span
                    class="has-text-info"
                    v-if="member.data().role === 'standard'"
                  >{{ member.data().role }}</span>
                  <span
                    class="has-text-danger"
                    v-if="member.data().role === 'admin'"
                  >{{ member.data().role }}</span>
                </td>
                <td>
                  <button
                    class="button is-small is-success"
                    v-if="member.data().status === 'denied'"
                    @click="set_access_status(member.id, 'approved')"
                  >Approve Access</button>
                  <button
                    class="button is-small is-danger"
                    v-if="member.data().status === 'approved'"
                    @click="set_access_status(member.id, 'denied')"
                  >Deny Access</button>
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
      members: []
    };
  },
  methods: {
    get_all_members: function() {
      fireDb
        .collection("members")
        //   .orderBy("date_published", "desc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.members.push(doc);
          });
        })
        .catch(err => {
          alert("Error getting members", err);
        });
    },
    set_access_status: function(member_id, status) {
      fireDb
        .collection("members")
        .doc(member_id)
        .update({
          status: status
        })
        .then(function() {
          location.href = '/admin/members'
        })
        .catch(function(error) {
          alert("Error updating document: ", error);
        });
    }
  },
  async created() {
    await this.get_all_members();
  }
};
</script>
