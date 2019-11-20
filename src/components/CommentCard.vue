<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="has-text-weight-bold">{{ comment.email }}</p>
          <p class="subtitle is-6">Posted {{ comment.published_at.toDate() }}</p>
        </div>
      </div>

      <div class="content is-italic">{{ comment.comment }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentCard",
  props: ["comment"]
};
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>