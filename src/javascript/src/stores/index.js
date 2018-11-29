import Vue from 'vue'
import Vuex from 'vuex'

import QuerysStore from '@/stores/queryStore'
import ResultStore from '@/stores/resultStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    queryStore: QuerysStore,
    resultStore: ResultStore
  }
})