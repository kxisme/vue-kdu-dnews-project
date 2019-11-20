<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ newsletter.data().title }}</p>
          <p class="subtitle is-6">
            <span class="tag is-info">{{ newsletter.data().tag }}</span>
          </p>
        </div>
      </div>

      <div class="content">
        {{ newsletter.data().short_description }}
        <br />Created
        <i>{{ newsletter.data().date_published.toDate().toString().substring(0, 16) }}</i> by
        <span class="has-text-info">{{ newsletter.data().created_by }}</span>
        <br />
        <router-link :to="{ name: 'newsletterDetails', params: { id: newsletter.id }}" class="has-text-danger">Read more</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsletterCard",
  props: ["newsletter"]
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>