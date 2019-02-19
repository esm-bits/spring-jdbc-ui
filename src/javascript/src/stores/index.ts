import Vue from "vue";
import Vuex from "vuex";

import { queryStore } from "@/stores/queryStore";
import ResultStore from "@/stores/resultStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    queryStore,
    resultStore: ResultStore
  }
});
