<template>
  <v-card style="margin:10px">
    <v-layout>
      <v-flex xs1 style="margin:5px">
        <v-layout column >
          <v-flex  style="align-self:center">
            <v-btn small id="upvoteBtn" @click="upVote" flat icon>
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-flex>
          <v-flex v-if="post.numOfUpVotes || post.numOfDownVotes">
              <h6 style="text-align:center;margin:0px">{{ netVotes }}</h6>
          </v-flex>
          <v-flex style="align-self:center">
            <v-btn small id="downvoteBtn" @click="downVote" flat icon>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs11 style="margin:20px">
        <h5 style="overflow:hidden;text-overflow:ellipsis">{{ post.title }}</h5>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    downVote: function () {
      this.post.numOfDownVotes++
      this.post.netVotes--
      this.$emit('voted')
    },
    upVote: function () {
      this.post.numOfUpVotes++
      this.post.netVotes++
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
