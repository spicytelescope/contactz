import Vue from 'vue'
import Vuex from 'vuex'
var _ = require('underscore')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [],
    query: ''
  },
  mutations: {
    addPost: (state, payload) => {
      console.log(payload)
      state.contacts.push(payload)
    },
    addPosts: (state, payload) => {
      for (let i in payload) {
        state.contacts.push(payload[i])
      }
    },
    shuffleContacts: state => (state.contacts = _.shuffle(state.contacts)),
    deleteContact: (state, target_id) => {
      state.contacts = state.contacts.filter(c => c.id != target_id)
    }
  },
  actions: {},
  modules: {}
})
