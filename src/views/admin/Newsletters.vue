<template>
  <div class>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">All Newsletter</h1>
          <h2 class="subtitle">List of newsletters of KDU D-News</h2>
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
                <th>Description</th>
                <th>Date Published</th>
                <th>Created By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(news, index) in news_object" :key="news.id">
                <td>{{ index+1 }}</td>
                <td>{{ news.data().title }}</td>
                <td>{{ news.data().tag }}</td>
                <td>{{ news.data().short_description }}</td>
                <td>{{ news.data().date_published.toDate() }}</td>
                <td>{{ news.data().created_by }}</td>
                <td>
                  <button
                    class="button is-small is-success"
                    v-if="news.data().status === 'denied'"
                    @click="set_news_status(news.id, 'approved')"
                  >Approve newsletter</button>
                  <button
                    class="button is-small is-danger"
                    v-if="news.data().status === 'approved'"
                    @click="set_news_status(news.id, 'denied')"
                  >Deny newsletter</button>
                  <button
                    class="button is-small is-light"
                    style="margin-left: 10px;"
                    @click="delete_news(news.id)"
                  >Delete newsletter</button>
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
      news_object: []
    };
  },
  methods: {
    delete_news: function(news_id) {
      fireDb
        .collection("news")
        .doc(news_id)
        .delete()
        .then(function() {
          location.href = "/admin/newsletters";
        })
        .catch(function(error) {
          alert("Error removing news: ", error);
        });
    },
    get_all_news: function() {
      fireDb
        .collection("news")
        .orderBy("date_published", "desc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.news_object.push(doc);
          });
        })
        .catch(err => {
          alert("Error getting news", err);
        });
    },
    set_news_status: function(news_id, status) {
      fireDb
        .collection("news")
        .doc(news_id)
        .update({
          status: status
        })
        .then(function() {
          location.href = "/admin/newsletters";
        })
        .catch(function(error) {
          alert("Error updating news: ", error);
        });
    }
  },
  async created() {
    await this.get_all_news();
  }
};
</script>
