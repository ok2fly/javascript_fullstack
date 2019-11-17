import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const state = { //data
  count:1
}
const mutations = { //methods
  add(state,n) {
    state.count +=n 
  },
  reduce(state) {
    state.count -- 
  }
}
const getters = {
  count:(state) => {
    return state.count += 100
  }
}
const actions = {
  addAction(context) {
    context.commit('add',10)
  },
  reduceAction(context){
    context.commit('reduce',10)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})