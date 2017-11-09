import App from '@/App'
import { mount } from 'vue-test-utils'

describe('App.vue', () => {
  it('sets the correct default data', () => {
    expect(App.data).to.be.a('function')
    const defaultData = App.data()
    expect(defaultData.dialog).to.be.false
    expect(defaultData.saveBtnDisabled).to.be.false
    expect(defaultData.posts).to.be.an('array').that.is.empty
  })

  it('open and closes new topic creation dialog upon newTopicBtn click', () => {
    let wrapper = mount(App)
    wrapper.find('#newTopicBtn').trigger('click')
    expect(wrapper.vm.dialog).to.be.true
    wrapper.find('#dialogCloseBtn').trigger('click')
    expect(wrapper.vm.dialog).to.be.false
  })

  it('should validateNewTitle to be between 1 to 255 characters', () => {
    let wrapper = mount(App)
    expect(wrapper.vm.validateNewTitle('')).to.equal('Title must be within 1 to 255 characters')
    expect(wrapper.vm.validateNewTitle('validTitle')).to.be.true
    expect(wrapper.vm.validateNewTitle('a very very long stringa very very long stringa very very long stringa very very long stringa very very long stringa very very long stringa very very long stringa very very long stringa very very long stringa very very long stringa very very long stringsss')).to.equal('Title must be within 1 to 255 characters')
  })

  it('should add to posts when creating new post', () => {
    let wrapper = mount(App)
    const createNewPostSpy = sinon.spy(wrapper.vm, 'createNewPost')
    // simuate new post creation
    wrapper.find('#newTopicBtn').trigger('click')
    wrapper.setData({newTopicTitle: 'New Post!'})
    wrapper.find('#dialogSaveBtn').trigger('click')
    // expect the new post to be added
    expect(wrapper.vm.posts).to.be.an('array').to.include({title: 'New Post!', 'numOfUpVotes': 0, 'numOfDownVotes': 0})
    expect(createNewPostSpy.called).to.be.true
  })

  it('should sort posts based on decreasing netvotes', () => {
    let wrapper = mount(App)
    // stub initial posts
    let postsStub = [
      {
        title: 'Post 1',
        numOfUpVotes: 100,
        numOfDownVotes: 50
      },
      {
        title: 'Post 2',
        numOfUpVotes: 100,
        numOfDownVotes: 51
      },
      {
        title: 'Post 3',
        numOfUpVotes: 100,
        numOfDownVotes: 51
      },
      {
        title: 'Post 4',
        numOfUpVotes: 100,
        numOfDownVotes: 99
      },
      {
        title: 'Post 5',
        numOfUpVotes: 99,
        numOfDownVotes: 100
      }
    ]
    wrapper.setData({posts: postsStub})
    const sortPostSpy = sinon.spy(wrapper.vm, 'sortPost')

    // create new post
    expect(sortPostSpy.called).to.be.false
    wrapper.find('#newTopicBtn').trigger('click')
    wrapper.setData({newTopicTitle: 'New Post!'})
    wrapper.find('#dialogSaveBtn').trigger('click')

    // expect the sortPost function to be called
    expect(sortPostSpy.called).to.be.true
    // new expected order. New post should be inserted at index 3
    expect(wrapper.vm.posts[0]).to.deep.equal({title: 'Post 1', 'numOfUpVotes': 100, 'numOfDownVotes': 50})
    expect(wrapper.vm.posts[1]).to.deep.equal({title: 'Post 2', 'numOfUpVotes': 100, 'numOfDownVotes': 51})
    expect(wrapper.vm.posts[2]).to.deep.equal({title: 'Post 3', 'numOfUpVotes': 100, 'numOfDownVotes': 51})
    expect(wrapper.vm.posts[3]).to.deep.equal({title: 'Post 4', 'numOfUpVotes': 100, 'numOfDownVotes': 99})
    expect(wrapper.vm.posts[4]).to.deep.equal({title: 'New Post!', 'numOfUpVotes': 0, 'numOfDownVotes': 0})
    expect(wrapper.vm.posts[5]).to.deep.equal({title: 'Post 5', 'numOfUpVotes': 99, 'numOfDownVotes': 100})
  })
})

