# codingchallenge_reddit 
<p align="center">
  <a href="https://travis-ci.org/Huixiong91/codingchallenge_reddit"><img src="https://travis-ci.org/Huixiong91/codingchallenge_reddit.svg?branch=master" alt="Build Status"></a>
  <a href="https://coveralls.io/github/Huixiong91/codingchallenge_reddit?branch=master"><img src="https://coveralls.io/repos/github/Huixiong91/codingchallenge_reddit/badge.svg?branch=master" alt="Coverage Status"></a>
  <a href="https://github.com/Huixiong91/codingchallenge_reddit"><img src="https://img.shields.io/david/Huixiong91/codingchallenge_reddit.svg" alt="Dependencies"></a>
</p>

> A Coding Challenge to make a simple Reddit

## Design
> Made out of 2 components, **Post** & **App**.
1. **Post** - Display post in a cardview with title, 2 buttons to upvote & downvote and the current netvotes(upvote - downvote)
2. **App** - The main page. It will handle creation of new post through a button that will open a dialog when clicked. It also keep tracks
of a list of post and shows list of top 20 posts by making use of the **Post** component.

## Build Setup

First, clone this project and cd into the root directory
```
git clone https://github.com/Huixiong91/codingchallenge_reddit.git
cd codingchallenge_reddit
```

In root directory
``` bash
# install dependencies
npm install
```

Commands
```
# run locally with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

<p align="center">
  Build with <a href="https://github.com/vuejs/vue">Vue.js</a> & <a href="https://github.com/vuetifyjs/vuetify">Vuetify</a>
</p>
