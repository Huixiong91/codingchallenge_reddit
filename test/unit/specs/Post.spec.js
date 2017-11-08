// import Vue from 'vue'
import Post from '@/components/Post'
import { mount } from 'vue-test-utils'

describe('Post.vue', () => {
  let wrapper
  let vm
  let post
  beforeEach(function () {
    post = {
      title: 'Post #1',
      numOfUpVotes: 0,
      numOfDownVotes: 0
    }
    wrapper = mount(Post)
    wrapper.setProps({post: post})
    vm = wrapper.vm
  })
  it('should accept "post" prop', () => {
    expect(wrapper.hasProp('post', post)).to.equal(true)
  })

  it('increase numOfUpVotes upon clicking upvote button ', () => {
    expect(vm.post.numOfUpVotes).to.equal(0)
    wrapper.find('#upvoteBtn').trigger('click')
    expect(vm.post.numOfUpVotes).to.equal(1)
  })

  it('increase numOfDownVotes upon clicking downvote button ', () => {
    expect(vm.post.numOfDownVotes).to.equal(0)
    wrapper.find('#downvoteBtn').trigger('click')
    expect(vm.post.numOfDownVotes).to.equal(1)
  })
})
