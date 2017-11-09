<template>
  <v-app>
    <main>
      <v-content>
         <v-toolbar>
          <v-toolbar-title>Reddit Clone</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn id="newTopicBtn" flat @click="dialog = true">New Topic</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">New topic</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Title" required
                        :rules="[validateNewTitle]"
                        :counter="255" v-model="newTopicTitle">
                        </v-text-field>
                      </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn id="dialogCloseBtn" color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                  <v-btn id="dialogSaveBtn" color="blue darken-1" flat @click="createNewPost" :disabled='saveBtnDisabled'>Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

        <transition-group name="flip-list" tag="ul">
          <post v-for="post in top20Posts" v-bind:key="post.id" :post="post" v-on:voted="sortPost" >
          </post>
        </transition-group>
      </v-content>
    </main>
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import Post from './components/Post'
import _ from 'lodash'
export default {
  components: {
    'post': Post
  },
  methods: {
    // function to validate that the new post title is within 255 characters
    validateNewTitle: function (title) {
      this.saveBtnDisabled = title.length < 1 || title.length > 255
      return title.length >= 1 && title.length <= 255 || 'Title must be within 1 to 255 characters'
    },
    // method to sort based on net votes scores.
    sortPost: function () {
      // commented out as chrome sort is not stable, causing some vue animation on list rendering
      // Edge and Firefox is stable...
      // this.posts.sort(function (a, b) {
      //   let netVotesA = a.numOfUpVotes - a.numOfDownVotes
      //   let netVotesB = b.numOfUpVotes - b.numOfDownVotes
      //   if (netVotesA > netVotesB) return -1
      //   else if (netVotesA < netVotesB) return 1
      //   return 0
      // })
      this.posts = _.orderBy(this.posts, ['netVotes'], ['desc']) // use lodash orderBy, which is stable.
    },
    // method to create a new post
    createNewPost: function () {
      var newPost = { // new post object
        id: this.totalNumOfPosts,
        title: this.newTopicTitle,
        numOfDownVotes: 0,
        numOfUpVotes: 0,
        netVotes: 0
      }
      this.posts.push(newPost) // add new post to list of posts
      this.dialog = false // close the dialog
      this.newTopicTitle = '' // clear the dialog input
      this.sortPost()
    }
  },
  // data that are computed/derived
  computed: {
    totalNumOfPosts: function () {
      return this.posts.length
    },
    top20Posts: function () {
      return this.posts.slice(0, 20)
    }
  },
  data () {
    return {
      dialog: false, // show dialog
      newTopicTitle: '',
      saveBtnDisabled: false,
      posts: []
    }
  }
}
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 2s;
}
</style>

