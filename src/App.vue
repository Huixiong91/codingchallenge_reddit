<template>
  <v-app>
    <main>
      <v-content>
         <v-toolbar>
          <v-toolbar-title>Reddit Clone</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn flat @click.native.stop="dialog = true">New Topic</v-btn>
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
                  <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.native="createNewPost" :disabled='saveBtnDisabled'>Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

        <transition-group name="flip-list" tag="ul" mode="out-in">
          <post v-for="post in top20Posts" :key="post.title" :post="post" v-on:voted="sortPost" >
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
import Post from './components/post'

export default {
  components: {
    'post': Post
  },
  methods: {
    // function to validate that the new post title is within 255 characters
    validateNewTitle: function (title) {
      this.saveBtnDisabled = !(title.length <= 255)
      return title.length <= 255 || 'Max 255 characters!'
    },
    // method to sort based on net votes scores.
    sortPost: function () {
      this.posts.sort(function (a, b) {
        let netVotesA = a.numOfUpVotes - a.numOfDownVotes
        let netVotesB = b.numOfUpVotes - b.numOfDownVotes
        if (netVotesA > netVotesB) return -1
        else if (netVotesA < netVotesB) return 1
        return 0
      })
    },
    // method to create a new post
    createNewPost: function () {
      var newPost = { // new post object
        title: this.newTopicTitle,
        numOfDownVotes: 0,
        numOfUpVotes: 0
      }
      this.posts.push(newPost) // add new post to list of posts
      this.dialog = false // close the dialog
      this.newTopicTitle = '' // clear the dialog input
      this.sortPost()
    }
  },
  // data that are computed/derived
  computed: {
    top20Posts: function () {
      return this.posts.slice(0, 20)
    }
  },
  data () {
    return {
      dialog: false, // show dialog
      newTopicTitle: '',
      saveBtnDisabled: false, // disable save button?
      posts: [
        {
          title: 'Post #1',
          numOfDownVotes: 0,
          numOfUpVotes: 0
        },
        {
          title: 'Post #2',
          numOfDownVotes: 0,
          numOfUpVotes: 0
        },
        {
          title: 'Post #3',
          numOfDownVotes: 0,
          numOfUpVotes: 0
        },
        {
          title: 'Post #4',
          numOfDownVotes: 0,
          numOfUpVotes: 0
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.flip-list-move {
  transition: transform 2s;
}
</style>

