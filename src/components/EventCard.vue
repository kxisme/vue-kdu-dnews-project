<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{event.data().title}}</p>
          <p class="subtitle is-6">
            <span class="tag is-danger">{{event.data().tag}}</span>
          </p>
        </div>
      </div>

      <div class="content">
        {{event.data().short_description}}
        <br />Created
        <i>{{ event.data().date_published.toDate().toString().substring(0, 16) }}</i> by
        <span class="has-text-info">{{ event.data().created_by }}</span>
        <br />
        <router-link :to="{ name: 'eventDetails', params: { id: event.id }}" class="has-text-danger">Read more</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: ["event"],
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>