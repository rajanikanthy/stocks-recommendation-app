/**
 * Created by 212393921 on 12/11/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from '../firebase/firebase'

Vue.use(Vuex)
Vue.use(Firebase)

const state = {
  quotes: []
}

const getters = {
  quotes (state) {
    return state.quotes
  }
}

const mutations = {

  quotes (state, quotes) {
    state.quotes = quotes
  },

  addQuote (state, quote) {
    console.dir('Adding - ' + quote)
    Firebase.database.ref('quotes').push(quote)
  },

  updateCurrentPrice (state, update) {
    Firebase.database.ref('quotes' + '/' + update.key + '/current_price').set(update.current_price)
  },

  removeQuote (state, quoteKey) {
    Firebase.database.ref('quotes' + '/' + quoteKey).set(null)
  }
}

const actions = {
  initializeDatabase (context) {
    Firebase.database.ref('quotes').on('value', function (data) {
      context.commit('quotes', data.val())
    })
  },

  updateCurrentPrice (context, update) {
    context.commit('updateCurrentPrice', update)
  },

  addQuote (context, quote) {
    context.commit('addQuote', quote)
  },

  removeQuote (context, quoteKey) {
    context.commit('removeQuote', quoteKey)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
