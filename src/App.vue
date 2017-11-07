<template>
  <v-app>
    <main>
      <v-content>
        <post v-for="post in posts" :key="post.title" :post="post" v-on:voted="voted" >
        </post>
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
    voted: function () {
      this.posts.sort(function (a, b) {
        let netVotesA = a.numOfUpVotes - a.numOfDownVotes
        let netVotesB = b.numOfUpVotes - b.numOfDownVotes
        if (netVotesA > netVotesB) return -1
        else if (netVotesA < netVotesB) return 1
        return 0
      })
    }
  },
  data () {
    return {
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


