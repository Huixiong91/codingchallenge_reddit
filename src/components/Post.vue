<template>
  <v-card style="margin:10px">
      {{ post.title }}
      {{ post.numOfUpVotes}}
      {{ post.numOfDownVotes}}
      {{ netVotes }}
      <v-btn id="upvote" @click="upVote">
        Up
      </v-btn>
      <v-btn id="downvote" @click="downVote">
        Down
      </v-btn>
  </v-card>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    downVote: function () {
      this.post.numOfDownVotes++
      this.$emit('voted')
    },
    upVote: function () {
      this.post.numOfUpVotes++
      this.$emit('voted')
    }
  },
  computed: {
    netVotes: function () {
      return this.post.numOfUpVotes - this.post.numOfDownVotes
    }
  }
}
</script>

<style lang="scss">


</style>
